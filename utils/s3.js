import dotenv from "dotenv";
dotenv.config();

import S3 from "aws-sdk/clients/s3.js";
import fs from "fs";

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
// console.log(secretAccessKey);

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});
// console.log(s3);

export function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);
  console.log("Uplaod");

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
}

export function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}

// export default { uploadFile };
