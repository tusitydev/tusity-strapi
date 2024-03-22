export default ({ env }) => ({
  // configure for your email plugin

  // email: {
  //   config: {
  //     provider: 'nodemailer',
  //     providerOptions: {
  //       host: env('SMTP_HOST'),
  //       port: env('SMTP_PORT'),
  //       secure: true,
  //       auth: {
  //         user: env('SMTP_USERNAME'),
  //         pass: env('SMTP_PASSWORD'),
  //       },
  //     },
  //     settings: {
  //       defaultFrom: 'project-nodemailer-email',
  //     },
  //   },
  // },

  // configure for your upload plugin

  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          accessKeyId: env('AWS_BUCKET_ACCESS_KEY_ID'),
          secretAccessKey: env('AWS_BUCKET_SECRET_ACCESS_KEY'),
          região: env('AWS_REGION'),
          params: {
            Bucket: env('AWS_BUCKET'),
          },
          signatureVersion: 'v4',
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        excluir: {},
      },
    },
  },

  // swagger plugin configs. https://docs.strapi.io/dev-docs/plugins/documentation

  documentation: {
    config: {
      info: {
        version: '3.0.0',
      },
    },
  },

  // some auth configuration. https://docs.strapi.io/dev-docs/plugins/users-permissions

  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '10h',
      },
    },
  },

  // transforme your contents. https://market.strapi.io/plugins/strapi-plugin-transformer

  transformer: {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
    },
  },

  'strapi-plugin-populate-deep': {
    config: {
      defaultDepth: 5,
    },
  },
});
