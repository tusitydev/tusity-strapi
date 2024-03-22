export const config = {
  accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY,
  região: process.env.AWS_REGION,
  params: {
    Bucket: process.env.AWS_BUCKET,
  },
  signatureVersion: 'v4',
};
