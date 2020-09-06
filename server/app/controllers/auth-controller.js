const jwt = require("jsonwebtoken");

const authUtils = require("../utils/auth-utils");

module.exports = {
  logout: (req, res, next) => {
    const accessToken = authUtils.getAccessToken(req);

    if (!accessToken) return next({ statusCode: 401, displayMsg: "L'access token est manquant" });

    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      { ignoreExpiration: true },
      async (err, user) => {
        if (err) return next({ statusCode: 403, displayMsg: "L'access token est invalide" });

        try {
          await authUtils.invalidateUserRefreshToken(user);
          await authUtils.blacklistAccessToken(accessToken, user);
          res.status(204).json({});
        } catch (err) {
          next(err);
        }
      }
    );
  },

  refresh: (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken)
      return next({ statusCode: 401, displayMsg: "Le refresh token est manquant" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) return next({ statusCode: 403, displayMsg: "Le refresh token est invalide" });

      try {
        const validToken = await authUtils.isValidRefreshToken(user, refreshToken);
        if (!validToken)
          return next({ statusCode: 403, displayMsg: "Le refresh token n'est plus valide" });

        const payload = {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin
        };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "20m"
        });

        res.json({ data: { accessToken } });
      } catch (err) {
        next(err);
      }
    });
  },

  invalidateAccessToken: async (req, res, next) => {
    const { accessToken } = req.body;

    if (!accessToken) return next({ statusCode: 401, displayMsg: "L'access token est manquant" });

    try {
      await authUtils.invalidateAccessToken(accessToken);
      return res.status(201).json({});
    } catch (err) {
      next(err);
    }
  },

  invalidateRefreshToken: async (req, res, next) => {
    const { refreshToken } = req.body;

    if (!refreshToken)
      return next({ statusCode: 401, displayMsg: "Le refresh token est manquant" });

    try {
      await authUtils.invalidateRefreshToken(refreshToken);
      return res.status(204).json({});
    } catch (err) {
      next(err);
    }
  }
};
