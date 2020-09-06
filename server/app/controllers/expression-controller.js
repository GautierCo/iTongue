const expressionDatamapper = require("../db/expression-datamapper");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { label } = req.body;
      const newExpression = await expressionDatamapper.create(label);
      res.status(201).json({ data: newExpression });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { label } = req.body;
      const result = await expressionDatamapper.updateOne(id, label);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  },

  getAll: async (_, res, next) => {
    try {
      const result = await expressionDatamapper.findAll();
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  },

  getOneById: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await expressionDatamapper.findOneById(id);

      if (!result) return next();
      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  },

  deleteOne: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await expressionDatamapper.deleteOne(id);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  },

  todo: async (_, res) => {
    res.status(200).json({ data: "todo" });
  }
};
