const fs = require("fs");
const s3 = require("../s3");

module.exports = {
  getSameFileNames: filename => {
    return new Promise((resolve, reject) => {
      s3.listObjectsV2({ Prefix: filename }, (err, data) => {
        if (err) return reject(err);
        resolve(data.Contents);
      });
    });
  },

  upload: (file, mimetype, key) => {
    return new Promise((resolve, reject) => {
      const filestream = fs.createReadStream(file);
      s3.upload({ Key: key, Body: filestream, ContentType: mimetype }, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  },

  deleteOne: key => {
    return new Promise((resolve, reject) => {
      s3.deleteObject({ Key: key }, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  },

  deleteMany: objects => {
    return new Promise((resolve, reject) => {
      s3.deleteObjects(
        {
          Delete: {
            Objects: objects,
            Quiet: true
          }
        },
        (err, data) => {
          if (err) return reject(err);
          resolve(data);
        }
      );
    });
  }
};
