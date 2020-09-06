const client = require("./index");

module.exports = {
  /**
   * Search users and records matching with given expression
   * @param {String} expression - expression to query
   * @returns {Array} - Objects of results
   */
  findAll: async expression => {

    const query = {
      name: "search-users-irecords",
      text: "SELECT * FROM find_users_records($1)",
      values: [expression]
    };

    const result = await client.query(query);
    return result.rows;

  },
  
  /**
   * Search users matching with given expression
   * @param {String} expression - expression to query
   * @returns {Array} - Objects of results
   */
  findUsers: async expression => {

    const query = {
      name: "search-users",
      text: "SELECT * FROM find_users($1)",
      values: [expression]
    };

    const result = await client.query(query);
    return result.rows;

  },

  /**
   * Search records matching with given expression
   * @param {String} expression - expression to query
   * @returns {Array} - Objects of results
   */
  findRecords: async expression => {

    const query = {
      name: "search-records",
      text: "SELECT * FROM find_records($1)",
      values: [expression]
    };

    const result = await client.query(query);
    return result.rows;
  },
};
