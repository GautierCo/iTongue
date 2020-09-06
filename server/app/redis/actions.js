const { client } = require("./index");

module.exports = {
  /**
   * Checks if request exists in cache by query name as value
   * @param {String} key - Redis key to find
   * @returns {Promise<Array>} Results from Redis
   */
  getFromCache(key) {
    return new Promise((resolve, reject) => {
      client.get(key, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  },

  /**
   * Store Postgres request results in Redis
   * @param {String} key - Redis key to write
   * @param {Array<Object>} results - Results from Postgres request to store
   * @param {Number} [expirationTime] - After this time expressed in seconds, entry will be destroyed
   * @returns {Promise<string>}
   */
  setInCache(key, results, expirationTime) {
    if (!expirationTime) {
      return new Promise((resolve, reject) => {
        client.set(key, JSON.stringify(results), (err, data) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
        });
      });
    }

    return new Promise((resolve, reject) => {
      client.setex(key, expirationTime, JSON.stringify(results), (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  },

  /**
   * Clear Redis entry by KEY
   * @param {String} key - Redis key to write
   * @returns {Promise<string>}
   */
  clearFromCache(key) {
    return new Promise((resolve, reject) => {
      client.del(key, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
};
