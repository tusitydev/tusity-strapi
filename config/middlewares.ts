/* eslint-disable @typescript-eslint/restrict-template-expressions */

export default ({ env }) => [
  'strapi::errors',

  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            `${env('AWS_BUCKET')}.s3.amazonaws.com`,
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            `${env('AWS_BUCKET')}.s3.amazonaws.com`,
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::favicon',
  'strapi::public',
  'strapi::session',
];
