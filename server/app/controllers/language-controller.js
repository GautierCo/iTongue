const languageDatamapper = require("../db/language-datamapper");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { name, code } = req.body;
      const newLanguage = await languageDatamapper.create(name, code);
      res.status(201).json({ data: newLanguage });
    } catch (err) {
      next(err);
    }
  },

  getAll: async (_, res, next) => {
    try {
      const languages = await languageDatamapper.findAll();
      if (!languages) return next();
      res.json({ data: languages });
    } catch (err) {
      next(err);
    }
  },
  
  getOne: async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    try {
      const language = await languageDatamapper.findOneById(id);
      if (!language) return next();
      res.json({ data: language });
    } catch (err) {
      next(err);
    }
  },
  
  update: async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const { name, code } = req.body;
    try {
      const isUpdated = await languageDatamapper.updateOne(id, name, code);
      if (!isUpdated) return next();
      res.json({ data: isUpdated });
    } catch (err) {
      next(err);
    }
  },
  
  delete: async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    try {
      const isDelete = await languageDatamapper.deleteOne(id);
      if (!isDelete) return next();
      res.json({ data: isDelete });
    } catch (err) {
      next(err);
    }
  },

  todo: async (_, res) => {
    res.status(200).json({ data: "todo" });
  }
};
