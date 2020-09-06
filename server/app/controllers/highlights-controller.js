const highlightsDatamapper = require("../db/highlights-datamapper");

module.exports = {
  getBestUsers: async (req, res, next) => {
    const { limit } = req.query;
    try {
      const bestUsers = await highlightsDatamapper.getBestUsers(limit);
      res.json({ data: bestUsers });
    } catch (err) {
      next(err);
    }
  },

  getBestTranslations: async (req, res, next) => {
    const { limit } = req.query;
    try {
      const bestTranslations = await highlightsDatamapper.getBestTranslations(limit);
      res.json({ data: bestTranslations });
    } catch (err) {
      next(err);
    }
  },

  getLastiRecords: async (req, res, next) => {
    const { limit } = req.query;
    console.log(limit);
    try {
      const lastIrecords = await highlightsDatamapper.getLastiRecords(limit);
      res.json({ data: lastIrecords });
    } catch (err) {
      next(err);
    }
  }
};
