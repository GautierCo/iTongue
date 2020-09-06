const jwt = require("jsonwebtoken");

const authUtils = require("../utils/auth-utils");

module.exports = async (req, _, next) => {
  const accessToken = authUtils.getAccessToken(req);

  if (!accessToken) return next({ statusCode: 401, displayMsg: "L'access token est manquant" });

  try {
    if (await authUtils.isBlacklistedToken(accessToken))
      return next({ statusCode: 403, displayMsg: "L'access token n'est plus valide" });

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return next({ statusCode: 403, displayMsg: "L'access token est invalide" });

      req.user = user;
      next();
    });
  } catch (err) {
    next(err);
  }
};
