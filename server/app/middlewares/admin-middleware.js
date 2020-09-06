const authMiddleware = require("./auth-middleware");

module.exports = [
  authMiddleware,
  (req, res, next) => {
    if (!req.user || !req.user.isAdmin)
      return res
        .status(403)
        .json({ errors: [{ msg: "Vous n'êtes pas autorisé à accéder à ce contenu" }] });

    next();
  }
];
