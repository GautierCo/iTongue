const adminDatamapper = require("../db/admin-datamapper");

module.exports = {
  getDashboard: async (req, res, next) => {
    try {
      const result = await adminDatamapper.getDashboardData();
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }
};
