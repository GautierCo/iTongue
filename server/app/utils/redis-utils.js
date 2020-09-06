module.exports = {
  regex: {
    isCreate: RegExp(/^(create){1}-/, "i"),
    isRead: RegExp(/^(read){1}-/, "i"),
    isMutation: RegExp(/^(update|delete){1}-/, "i"),
    isUserMutation: RegExp(/^\w+-user-/, "i")
  },

  expirationTimes: {
    second: 1, // 1 second
    minute: 60, // Number of seconds in 1 minute
    hour: 60 * 60, // Number of seconds in 1 hour
    day: 60 * 60 * 24, // Number of seconds in 1 day
    week: 60 * 60 * 24 * 7, // Number of seconds in 1 week
    month: 60 * 60 * 24 * 30, // Number of seconds in 1 month
    year: 60 * 60 * 24 * 365 // Number of seconds in 1 year
  },

  /**
   * Generates the KEY for redis
   * @param {String} name - Name of the request
   * @param {Array} values - Values of the request
   * @returns {String} Generated Key with itongue PREFIX
   */
  generateKey(name) {
    return "itongue_" + name;
  }
};
