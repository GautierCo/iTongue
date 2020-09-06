module.exports = (_, res) => {
  res.errorMsg = "Aucune ressource à l'adresse demandée";
  res.status(404).json({ errors: [{ msg: res.errorMsg }] });
};
