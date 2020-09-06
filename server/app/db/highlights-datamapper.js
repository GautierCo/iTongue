const client = require("./");

const dataMapper = {
  getBestUsers: async limit => {
    const query = { text: 'SELECT * FROM "users_with_more_irecords"($1)', values: [limit] };

    const results = await client.query(query, [limit]);
    return results.rows;
  },

  getBestTranslations: async limit => {
    const query = {
      text: 'SELECT * FROM "translations_with_more_irecords"($1)',
      values: [limit]
    };
    const result = await client.query(query, [limit]);
    return result.rows;
  },

  getLastiRecords: async limit => {
    const query = {
      text: 'SELECT * FROM "show_records"() LIMIT $1',
      values: [limit]
    };
    const results = await client.query(query);
    return results.rows;
  }
};

module.exports = dataMapper;
