import AWS from 'aws-sdk';

export default {
  init: (config) => {
    const s3 = new AWS.S3(config);

    return {
      async upload(file) {
        // code to upload file to S3
      },

      async delete(file) {
        // code to delete file from S3
      },

      async isPrivate() {
        return true;
      },

      async getSignedUrl(file) {
        const params = {
          Bucket: config.params.Bucket,
          Key: new URL(file.url).pathname.slice(1),
          // Expires: 300, // URL expiration time in seconds
        };

        const signedUrl = await s3.getSignedUrlPromise('getObject', params);

        return signedUrl;
      },
    };
  },
};
