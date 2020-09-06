const authMiddleware = require("./auth-middleware");

module.exports = [
  authMiddleware,
  (req, _, next) => {
    if (!req.user.isAdmin && req.user.id != req.params.id)
      return next({
        statusCode: 403,
        displayMsg: "Vous n'êtes pas autorisé à agir sur ce compte utilisateur"
      });

    next();
  }
];
