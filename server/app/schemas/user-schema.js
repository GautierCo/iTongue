const { USER_FIELDS, USER_LANGUAGE_FIELDS } = require("../constants");

module.exports = {
  email: {
    if: {
      options: (value, { req }) => !req.params.id || value
    },
    isEmail: {
      errorMessage: "Le format de l'adresse email est invalide"
    }
  },
  password: {
    if: {
      options: (_, { req }) => !req.params.id
    },
    notEmpty: {
      errorMessage: "Le mot de passe est requis"
    }
  },
  confirm: {
    if: {
      options: (_, { req, location }) => req[location].password
    },
    custom: {
      options: (value, { req, location }) => value === req[location].password,
      errorMessage: "La confirmation ne correspond pas au mot de passe saisi"
    }
  },
  firstname: {
    if: {
      options: (_, { req }) => !req.params.id
    },
    notEmpty: {
      errorMessage: "Le prénom est requis"
    }
  },
  lastname: {
    if: {
      options: (_, { req }) => !req.params.id
    },
    notEmpty: {
      errorMessage: "Le nom de famille est requis"
    }
  },
  slug: {
    if: {
      options: (_, { req }) => req.method === "POST" && /slug$/.test(req.path)
    },
    notEmpty: {
      errorMessage: "Le slug est manquant"
    }
  },
  bio: {
    if: {
      options: (value, { req }) => req.params.id && value
    },
    isLength: {
      options: { max: 140 },
      errorMessage: "La description ne doit pas excéder 140 caractères"
    }
  },
  learnedLanguages: {
    if: {
      options: (value, { req }) => req.params.id && value
    },
    custom: {
      options: isArrayOfLanguages,
      errorMessage: "Le format du tableau des langues apprises est invalide"
    }
  },
  taughtLanguages: {
    if: {
      options: (value, { req }) => req.params.id && value
    },
    custom: {
      options: isArrayOfLanguages,
      errorMessage: "Le format du tableau des langues enseignées est invalide"
    }
  },
  "*": {
    in: ["body"],
    custom: {
      options: (_, { __, ___, path }) => {
        if (!USER_FIELDS.includes(path)) throw new Error(`${path} n'est pas un paramètre valide`);
        return true;
      }
    }
  }
};

function isArrayOfLanguages(value) {
  if (!Array.isArray(value)) return false;

  for (const field of value.map(obj => Object.keys(obj)).flat()) {
    if (!USER_LANGUAGE_FIELDS.includes(field)) return false;
  }

  return true;
}
