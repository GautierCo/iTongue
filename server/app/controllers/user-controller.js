const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const slugify = require("slugify");

const userDatamapper = require("../db/user-datamapper");
const recordDatamapper = require("../db/record-datamapper");
const authUtils = require("../utils/auth-utils");
const fileUtils = require("../utils/file-utils");

const fsPromises = fs.promises;

const { SALT_ROUNDS, USER_ROLES, PUBLIC_DIR, AVATARS_DIR, RECORDS_DIR } = require("../constants");

module.exports = {
  showAll: async (_, res, next) => {
    try {
      const users = await userDatamapper.showAll();
      res.json({ data: users });
    } catch (err) {
      next(err);
    }
  },

  showOne: async (req, res, next) => {
    const { id: userId, slug } = req.params;

    if ((userId && isNaN(userId)) || (slug && !/^[a-z\d]+(-[a-z\d]+)*$/.test(slug)))
      return next({ statusCode: 400, displayMsg: "Le paramètre reçu dans l'url n'est pas valide" });

    try {
      const [field, value] = userId ? ["id", userId] : ["slug", slug];
      const user = await userDatamapper.showOne({
        [field]: { operator: "=", value: value }
      });
      if (!user) return next();
      res.json({ data: user });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { email, password, firstname, lastname } = req.body;

      const user = await userDatamapper.findOne({ email: { operator: "=", value: email } }, false);

      if (user) return next({ statusCode: 409, displayMsg: "L'adresse email existe déjà" });

      const userSlug = await getAvailableSlug(slugify(firstname + " " + lastname, { lower: true }));

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const result = await userDatamapper.insertOne({
        email,
        password: hashedPassword,
        firstname,
        lastname,
        slug: userSlug
      });

      res.status(201).json({ data: result });
    } catch (err) {
      next(err);
    }
  },

  deleteOne: async (req, res, next) => {
    const userId = req.params.id;
    if (isNaN(userId))
      return next({ statusCode: 400, displayMsg: "Le paramètre reçu dans l'url n'est pas valide" });

    try {
      await userDatamapper.deleteOne(userId);
      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  },

  // TODO Séparer les responsabilités : language, avatar, record

  addLanguage: async (req, res, next) => {
    const userId = req.params.id;
    const { language_id: languageId, role } = req.body;

    if (isNaN(userId) || isNaN(languageId) || !USER_ROLES.includes(role))
      return next({ statusCode: 400, displayMsg: "Au moins un des paramètres est invalide" });

    const userLanguage = { languageId, userId, role };

    const alreadyExists = await userDatamapper.findLanguage(userLanguage);
    if (alreadyExists) return res.status(409).json({ alreadyExists });

    try {
      const result = await userDatamapper.addLanguage(userLanguage);
      res.status(201).json({ data: result });
    } catch (err) {
      next(err);
    }
  },

  removeLanguage: async (req, res, next) => {
    const { id: userId, languageId, role } = req.params;

    if (isNaN(userId) || isNaN(languageId) || !USER_ROLES.includes(role))
      return next({
        statusCode: 400,
        displayMsg: "Au moins un des paramètres reçus dans l'url n'est pas valide"
      });

    try {
      await userDatamapper.deleteLanguage({ userId, languageId, role });
      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  },

  updateSlug: async (req, res, next) => {
    const slug = slugify(req.body.slug, { lower: true });
    try {
      const availableSlug = await getAvailableSlug(slug);

      if (availableSlug === slug) {
        await userDatamapper.update({ id: req.params.id, slug });
        return res.status(204).json({});
      }

      return res.status(409).json({ data: availableSlug });
    } catch (err) {
      next(err);
    }
  },

  updateAvatar: async (req, res, next) => {
    if (!req.file) return next({ statusCode: 400, displayMsg: "Le fichier image est manquant" });

    const userId = req.params.id;
    if (isNaN(userId))
      return next({ statusCode: 400, displayMsg: "Le paramètre reçu dans l'url n'est pas valide" });

    const fileName = req.file.filename;
    const tempPath = path.resolve(req.file.path);

    let avatarUrl, uploaded;

    try {
      const user = await userDatamapper.findByPk(userId);
      if (!user) return next();

      if (user.avatar_url) {
        avatarUrl = user.avatar_url;
      } else {
        const destSubDir = fileName.split("").slice(0, 4).join("/");
        const destBaseName = fileName.substring(4);

        avatarUrl = `${AVATARS_DIR}/${destSubDir}/${destBaseName}`;
      }

      uploaded = await fileUtils.upload(tempPath, req.file.mimetype, avatarUrl);

      if (!user.avatar_url) {
        await userDatamapper.setAvatarUrl(avatarUrl, user.id);
      }

      res.json({ data: { avatarUrl } });
    } catch (err) {
      if (uploaded) {
        try {
          await fileUtils.deleteOne(avatarUrl);
        } catch (fileErr) {
          return next({ msg: err.toString() + ", " + fileErr.toString() });
        }
      }

      next(err);
    } finally {
      try {
        if (fs.existsSync(tempPath)) await fsPromises.unlink(tempPath);
      } catch (err) {
        console.log(err);
      }
    }
  },

  addRecord: async (req, res, next) => {
    if (!req.file) return next({ statusCode: 400, displayMsg: "Le fichier audio est manquant" });

    const userId = req.params.id;
    const translationId = req.body.translation_id;

    try {
      const user = await userDatamapper.findByPk(userId);
      if (!user) return next();
    } catch (err) {
      return next(err);
    }

    const fileName = req.file.filename;
    const tempPath = path.resolve(req.file.path);

    let recordUrl, uploaded;

    try {
      const oldRecord = await recordDatamapper.findOne({
        user_id: { operator: "=", value: userId },
        translation_id: { operator: "=", value: translationId }
      });

      if (oldRecord) {
        recordUrl = oldRecord.url;
      } else {
        const destSubDir = fileName.split("").slice(0, 4).join("/");
        const destBaseName = fileName.substring(4);

        recordUrl = `${RECORDS_DIR}/${destSubDir}/${destBaseName}`;
      }

      uploaded = await fileUtils.upload(tempPath, req.file.mimetype, recordUrl);

      res.statusCode = 201;

      let record;
      if (oldRecord) {
        record = await recordDatamapper.showByPk(oldRecord.id);
      } else {
        const result = await recordDatamapper.insertOne({
          userId,
          translationId,
          url: recordUrl
        });
        record = await recordDatamapper.showByPk(result.id);
      }

      delete record.user;
      res.json({ data: { record } });
    } catch (err) {
      if (uploaded) {
        try {
          await fileUtils.deleteOne(recordUrl);
        } catch (fileErr) {
          return next([{ msg: err.toString + ", " + fileErr.toString() }]);
        }
      }

      next(err);
    } finally {
      try {
        if (fs.existsSync(tempPath)) await fsPromises.unlink(tempPath);
      } catch (err) {
        console.log(err);
      }
    }
  },

  removeRecord: async (req, res, next) => {
    const { recordId } = req.params;

    try {
      const record = await recordDatamapper.findByPk(recordId);
      if (!record) return next();

      const sameFileNames = await fileUtils.getSameFileNames(record.url);
      if (sameFileNames.length) {
        await fileUtils.deleteMany(sameFileNames.map(({ Key }) => ({ Key })));
      }

      await recordDatamapper.deleteOne(recordId);
      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  },

  editProfile: async (req, res, next) => {
    const userId = req.params.id;
    if (isNaN(userId))
      return next({ statusCode: 400, displayMsg: "Le paramètre reçu dans l'url n'est pas valide" });

    const { confirm, learnedLanguages, taughtLanguages, ...user } = req.body;
    user.id = userId;

    const learnedLanguagesInserts = !learnedLanguages
      ? []
      : learnedLanguages.map(language => ({
          language_id: language.id,
          user_id: userId,
          role: "learner"
        }));

    const taughtLanguagesInserts = !taughtLanguages
      ? []
      : taughtLanguages.map(language => ({
          language_id: language.id,
          user_id: userId,
          role: "teacher"
        }));

    try {
      await userDatamapper.syncLanguages([...learnedLanguagesInserts, ...taughtLanguagesInserts]);

      const hasNewPassword = "password" in user && user.password !== "";
      if (hasNewPassword) {
        user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
      }
      const updatedUser = await userDatamapper.update(user);
      if (!updatedUser) return next();

      if (!req.user.isAdmin) {
        const oldAccessToken = authUtils.getAccessToken(req);
        await authUtils.invalidateAccessToken(oldAccessToken);
      }

      const accessToken = authUtils.accessToken(updatedUser);
      const needsUpdate = user.email || hasNewPassword;
      const refreshToken = await authUtils.refreshToken(updatedUser, needsUpdate);

      res.json({ data: { accessToken, refreshToken } });
    } catch (err) {
      next(err);
    }
  },

  follow: async (req, res, next) => {
    const userId = req.params.id;
    const { followedId } = req.body;

    if (isNaN(userId) || isNaN(followedId))
      return next({
        statusCode: 400,
        displayMsg: "L'indentifiant d'un utilisateur doit être un entier"
      });

    const user = await userDatamapper.findByPk(userId, false);
    if (!user) return next();
    const followedUser = await userDatamapper.findByPk(followedId, false);
    if (!followedUser) return next();

    try {
      await userDatamapper.follow(userId, followedId);
      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  },

  unfollow: async (req, res, next) => {
    const { id: userId, followedId } = req.params;

    if (isNaN(userId) || isNaN(followedId))
      return next({
        statusCode: 400,
        displayMsg: "L'indentifiant d'un utilisateur doit être un entier"
      });

    try {
      await userDatamapper.unfollow(userId, followedId);
      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  },

  showFollowers: async (req, res, next) => {
    const userId = req.params.id;

    if (isNaN(userId))
      return next({
        statusCode: 400,
        displayMsg: "L'identifiant d'un utilisateur doit être un entier"
      });

    const user = await userDatamapper.findByPk(userId, false);
    if (!user) return next();

    try {
      const followers = await userDatamapper.getFollowers(userId);
      res.json({ data: followers });
    } catch (err) {
      next(err);
    }
  },

  showFollowed: async (req, res, next) => {
    const userId = req.params.id;

    if (isNaN(userId))
      return next({
        statusCode: 400,
        displayMsg: "L'identifiant d'un utilisateur doit être un entier"
      });

    const user = await userDatamapper.findByPk(userId, false);
    if (!user) return next();

    try {
      const followed = await userDatamapper.getFollowed(userId);
      res.json({ data: followed });
    } catch (err) {
      next(err);
    }
  },

  showFeed: async (req, res, next) => {
    const userId = req.params.id;
    if (isNaN(userId))
      return next({
        statusCode: 400,
        displayMsg: "L'identifiant d'un utilisateur doit être un entier"
      });

    const user = await userDatamapper.findByPk(userId, false);
    if (!user) return next();

    try {
      const feed = await userDatamapper.getFeed(userId);
      res.json({ data: feed });
    } catch (err) {
      next(err);
    }
  },

  showLikes: async (req, res, next) => {
    const userId = req.params.id;

    if (isNaN(userId))
      return next({
        statusCode: 400,
        displayMsg: "L'identifiant d'un utilisateur doit être un entier"
      });

    const user = await userDatamapper.findByPk(userId, false);
    if (!user) return next();

    try {
      const likes = await userDatamapper.getLikes(userId);
      res.json({ data: likes });
    } catch (err) {
      next(err);
    }
  },

  showBookmarks: async (req, res, next) => {
    const userId = req.params.id;

    if (isNaN(userId))
      return next({
        statusCode: 400,
        displayMsg: "L'identifiant d'un utilisateur doit être un entier"
      });

    const user = await userDatamapper.findByPk(userId, false);
    if (!user) return next();

    try {
      const likes = await userDatamapper.getBookmarks(userId);
      res.json({ data: likes });
    } catch (err) {
      next(err);
    }
  },

  showThreads: async (req, res, next) => {
    const userId = req.params.id;

    if (isNaN(userId))
      return next({
        statusCode: 400,
        displayMsg: "L'identifiant d'un utilisateur doit être un entier"
      });

    const user = await userDatamapper.findByPk(userId, false);
    if (!user) return next();

    try {
      const threads = await userDatamapper.getThreads(userId);
      res.json({ data: threads });
    } catch (err) {
      next(err);
    }
  },

  showThread: async (req, res, next) => {
    const { id: userId, contactId } = req.params;

    if (isNaN(userId) || isNaN(contactId))
      return next({
        statusCode: 400,
        displayMsg: "L'identifiant d'un utilisateur doit être un entier"
      });

    const user = await userDatamapper.findByPk(userId, false);
    if (!user) return next();

    try {
      const thread = await userDatamapper.getThread(userId, contactId);
      if (!thread) return next();
      res.json({ data: thread });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await userDatamapper.findOne({
        email: { operator: "=", value: email }
      });

      if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = authUtils.accessToken(user);
        const refreshToken = await authUtils.refreshToken(user);

        const keyMap = {
          avatar_url: "avatarUrl",
          is_admin: "isAdmin",
          created_at: "createdAt"
        };

        const cleanEntries = Object.entries(user).map(([key, value]) => [
          keyMap[key] || key,
          value
        ]);

        const display_user = Object.fromEntries(cleanEntries);
        delete display_user.password;

        return res.json({
          data: { accessToken, refreshToken, user: display_user }
        });
      }

      next({ statusCode: 401, displayMsg: "Identifiants incorrects" });
    } catch (err) {
      next(err);
    }
  }
};

async function getAvailableSlug(slug) {
  const slugsRows = await userDatamapper.findSlugs(slug);
  const slugs = slugsRows.map(row => row.slug);

  if (!slugs.includes(slug)) return slug;

  const lastSuffixInDb = slugs[0].match(/\d+$/);
  const suffix = lastSuffixInDb ? parseInt(lastSuffixInDb[0], 10) + 1 : 1;
  return slug.match(/[^\d]+(?=\d*$)/)[0] + suffix;
}
