module.exports = {
  id: {
    in: ["params"],
    isInt: {
      errorMessage: "L'identifiant utilisateur reçu dans l'url est invalide"
    }
  },
  translation_id: {
    in: ["body"],
    isInt: {
      errorMessage: "L'identifiant de la traduction doit être de type INTEGER"
    }
  }
};
