const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: {
    Bucket: process.env.AWS_S3_BUCKET,
    CacheControl: "no-store"
  }
});

module.exports = s3;
