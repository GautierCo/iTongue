const fetch = require("node-fetch");

module.exports = async (req, res, next) => {
  const { captcha } = req.body;
  const secretKey = process.env.RECAPTCHA_SECRET;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

  if (!captcha)
    return next({ statusCode: 400, displayMsg: "Le token reCaptcha est manquant ou invalide" });

  try {
    const verified = await fetch(verifyUrl, { method: "POST" });
    const response = await verified.json();

    if (!response.success || response.score < 0.3) return res.status(429).json(response);

    next();
  } catch (error) {
    next(error);
  }
};
