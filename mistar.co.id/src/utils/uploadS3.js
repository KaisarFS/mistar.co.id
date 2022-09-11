import S3 from "aws-s3";

export default async function uploadS3(dataUpload, dir = null) {
  const config = {
    dirName: dir || null,
    bucketName: process.env.VUE_APP_AWS_BUCKET,
    region: process.env.VUE_APP_AWS_REGION,
    accessKeyId: process.env.VUE_APP_AWS_KEY_ID,
    secretAccessKey: process.env.VUE_APP_AWS_ACCESS_KEY,
    s3Url: process.env.VUE_APP_AWS_URL
  };

  const S3Client = new S3(config);
  if (Array.isArray(dataUpload)) {
    if (dataUpload.length > 0) {
      let files = [];

      await Promise.all(
        dataUpload.map(async d => {
          const file = await S3Client.uploadFile(d).then(res => res.location);
          files.push(file);
        })
      );
      return files;
    } else {
      return [];
    }
  } else {
    return S3Client.uploadFile(dataUpload).then(res => res.location);
  }
}
