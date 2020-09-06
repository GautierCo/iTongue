const fs = require("fs").promises;
const fsPromises = fs.promises;
const multer = require("multer");
const path = require("path");

const limits = {
  fileSize: 2.5 * 1000 * 1000
};

const fileFilter = (req, file, cb) => {
  if (/\/avatar$/.test(req.path) && /^image\/(jpeg|png)$/.test(file.mimetype))
    return cb(null, true);

  if (/\/record$/.test(req.path) && /^audio\/(mpeg|wav|mp3)$/.test(file.mimetype))
    return cb(null, true);

  return cb(new Error("Le format du fichier n'est pas valide"));
};

module.exports = fieldname => (req, res, next) => {
  const upload = multer({
    dest: path.resolve("temp/" + fieldname),
    limits,
    fileFilter
  }).single(fieldname);

  upload(req, res, async error => {
    try {
      if (error && req.file && fs.existsSync(req.file.path)) {
        await fsPromises.unlink(req.file.path);
        next(error);
      }
    } catch (err) {
      next(err);
    }

    next();
  });
};
