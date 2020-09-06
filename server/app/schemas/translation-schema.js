module.exports = {
  text: {
    matches: {
      options: /\b/,
      errorMessage: "La traduction de l'expression doit être une chaîne de caractère de type alpha numérique"
    }
  },
  expression_id: {
    isInt: {
      errorMessage: "L'ID de l'expression doit être un INTEGER"
    }
  },
  language_id: {
    isInt: {
      errorMessage: "L'ID du langage doit être un INTEGER"
    }
  }
};
