const jwt = require("jsonwebtoken");
const redis = require("../redis");

const utils = {
  getAccessToken: req => {
    const authHeader = req.headers["authorization"];
    return authHeader && authHeader.split(" ")[1];
  },

  accessToken: user =>
    jwt.sign(payload(user), process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "20m"
    }),

  refreshToken: async (user, needsUpdate) => {
    if (!needsUpdate) {
      const oldRefreshToken = await getRefreshToken(user);
      if (oldRefreshToken) return oldRefreshToken;
    }

    const refreshToken = jwt.sign(payload(user), process.env.REFRESH_TOKEN_SECRET);
    await storeRefreshToken(user, refreshToken);
    return refreshToken;
  },

  isBlacklistedToken: token => {
    return new Promise((resolve, reject) => {
      redis.client.exists(redis.prefix + "invalid_token_" + token, (err, exists) => {
        if (err) return reject(err);
        resolve(exists);
      });
    });
  },

  isValidRefreshToken: (user, token) => {
    return new Promise((resolve, reject) => {
      redis.client.hget(redis.prefix + "refresh_tokens", user.id, (err, result) => {
        if (err) return reject(err);
        resolve(result === token);
      });
    });
  },

  invalidateAccessToken: async token => {
    const payload = await verifyToken(token, "access");
    return await utils.blacklistAccessToken(token, payload);
  },

  blacklistAccessToken: async (token, payload) => {
    const redisKey = redis.prefix + "invalid_token_" + token;

    if (payload.exp) {
      const remainingMs = payload.exp * 1000 - Date.now();
      if (remainingMs <= 0) return "OK";
      return await storeWithExp(redisKey, Math.round(remainingMs / 1000), 1);
    }

    return await store(redisKey, 1);
  },

  invalidateRefreshToken: async token => {
    const user = await verifyToken(token, "refresh");
    return await utils.invalidateUserRefreshToken(user);
  },

  invalidateUserRefreshToken: user => {
    return new Promise((resolve, reject) => {
      redis.client.hdel(redis.prefix + "refresh_tokens", user.id, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
};

function store(key, value) {
  return new Promise((resolve, reject) => {
    redis.client.set(key, value, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function storeWithExp(key, exp, value) {
  return new Promise((resolve, reject) => {
    redis.client.setex(key, exp, value, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function verifyToken(token, type) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env[type.toUpperCase() + "_TOKEN_SECRET"], async (err, user) => {
      if (err) return reject(err);
      resolve(user);
    });
  });
}

function storeRefreshToken(user, token) {
  return new Promise((resolve, reject) => {
    redis.client.hset(redis.prefix + "refresh_tokens", user.id, token, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function getRefreshToken(user) {
  return new Promise((resolve, reject) => {
    redis.client.hget(redis.prefix + "refresh_tokens", user.id, (err, token) => {
      if (err) return reject(err);
      resolve(token);
    });
  });
}

function payload(user) {
  return {
    id: user.id,
    email: user.email,
    isAdmin: user.is_admin
  };
}

module.exports = utils;
