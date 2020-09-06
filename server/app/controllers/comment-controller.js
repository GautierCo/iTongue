const commentDatamapper = require("../db/comment-datamapper");

module.exports = {
  showAllByRecordId: async (req, res, next) => {
    try {
      const { recordId } = req.params;
      const comments = await commentDatamapper.getAllByRecordId(recordId);
      res.json({ data: comments });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { recordId } = req.params;
      const text = req.body.text.trim();

      if (!text || !text.length)
        return next({
          statusCode: 400,
          displayMsg: "Le message est vide ou manquant"
        });

      const result = await commentDatamapper.insertOne(userId, recordId, text);
      res.status(201).json({ data: result });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const userId = req.user.id;

      const { commentId } = req.params;
      const text = req.body.text.trim();

      if (!text || !text.length)
        return next({
          statusCode: 400,
          displayMsg: "Le message est vide ou manquant"
        });

      const foundComment = await commentDatamapper.getOneById(commentId);

      if (!foundComment)
        return next({
          statusCode: 404,
          displayMsg: "Ce commentaire n'existe pas"
        });

      if (foundComment.user_id !== userId)
        return next({
          statusCode: 400,
          displayMsg: "Il faut être l'auteur du commentaire pour le modifier"
        });

      await commentDatamapper.updateOne(commentId, text);
      res.status(204).json();
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { commentId } = req.params;

      const foundComment = await commentDatamapper.getOneById(commentId);

      if (!foundComment) return res.status(204).json();

      if (foundComment.user_id !== userId)
        return next({
          statusCode: 400,
          displayMsg: "Il faut être l'auteur du commentaire pour le supprimer"
        });

      await commentDatamapper.deleteOne(commentId);
      res.status(204).json();
    } catch (err) {
      next(err);
    }
  }
};
