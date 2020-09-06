const translationDatamapper = require("../db/translation-datamapper");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { body } = req;
      const newTranslation = await translationDatamapper.create(body);
      res.status(201).json({ data: newTranslation });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { text, expression_id, language_id } = req.body;
      const newTranslation = await translationDatamapper.updateOne(id, text, expression_id, language_id);
      res.json({ data: newTranslation });
    } catch (err) {
      next(err);
    }
  },

  getAll: async (_, res, next) => {
    try {
      const translations = await translationDatamapper.findAll();
      res.status(200).json({ data: translations });
    } catch (err) {
      next(err);
    }
  },

  getOneById: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await translationDatamapper.findOneById(id);

      if (!result) return next();
      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  },

  deleteOne: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await translationDatamapper.deleteOne(id);
      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  },

  todo: async (_, res) => {
    res.status(200).json({ data: "todo" });
  }
};
