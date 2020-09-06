const recordDatamapper = require("../db/record-datamapper");

module.exports = {
  showAll: async (_, res, next) => {
    try {
      const records = await recordDatamapper.findAll();
      res.json({ data: records });
    } catch (err) {
      next(err);
    }
  },

  like: async (req, res, next) => {
    const recordId = req.params.id;

    if (isNaN(recordId))
      return next({
        statusCode: 400,
        displayMsg: "L'identifiant de l'iRecord doit être un entier"
      });

    try {
      const record = await recordDatamapper.findByPk(recordId);
      if (!record) return next();

      await recordDatamapper.addLike(req.user.id, recordId);
      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  },

  unlike: async (req, res, next) => {
    const recordId = req.params.id;
    if (isNaN(recordId))
      return next({
        statusCode: 400,
        displayMsg: "L'identifiant de l'iRecord doit être un entier"
      });

    try {
      await recordDatamapper.removeLike(req.user.id, recordId);
      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  },

  showLikes: async (req, res, next) => {
    const recordId = req.params.id;
    if (isNaN(recordId))
      return next({
        statusCode: 400,
        displayMsg: "L'identifiant de l'iRecord doit être un entier"
      });

    try {
      const likes = await recordDatamapper.getLikes(recordId);
      res.json({ data: likes });
    } catch (err) {
      next(err);
    }
  },

  bookmark: async (req, res, next) => {
    const recordId = req.params.id;

    if (isNaN(recordId))
      return next({
        statusCode: 400,
        displayMsg: "L'identifiant de l'iRecord doit être un entier"
      });

    try {
      const record = await recordDatamapper.findByPk(recordId);
      if (!record) return next();

      await recordDatamapper.addBookmark(req.user.id, recordId);
      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  },

  unbookmark: async (req, res, next) => {
    const recordId = req.params.id;
    if (isNaN(recordId))
      return next({
        statusCode: 400,
        displayMsg: "L'identifiant de l'iRecord doit être un entier"
      });

    try {
      await recordDatamapper.removeBookmark(req.user.id, recordId);
      res.status(204).json({});
    } catch (err) {
      next(err);
    }
  },

  showBookmarks: async (req, res, next) => {
    const recordId = req.params.id;
    if (isNaN(recordId))
      return next({
        statusCode: 400,
        displayMsg: "L'identifiant de l'iRecord doit être un entier"
      });

    try {
      const bookmarks = await recordDatamapper.getBookmarks(recordId);
      res.json({ data: bookmarks });
    } catch (err) {
      next(err);
    }
  }
};
