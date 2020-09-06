const client = require("./");

module.exports = {
  getDashboardData: async () => {
    const result = await client.query('SELECT * FROM "dashboard"');
    return result.rows;
  }
};
