module.exports = {
  name: {
    isAlpha: {
      errorMessage: "Le nom de la langue ne peut contenir que des lettres"
    }
  },
  code: {
    matches: {
      options: /(^[a-z]{2}$)|(^[a-z]{2}_[A-Z]{2}$)/ ,
      errorMessage: "Le code de la langue doit être du format [en] ou [en_US]"
    }
  }
};
