export default ({ env }) => ({
  // Here you can do some configurations to the server api

  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  url: env('PUBLIC_URL'),

  // only use if absolutely required

  // socket: '/tmp/nginx.socket',
  // emitErrors: false,
  // proxy: env.bool('IS_PROXIED', true),
  // cron: {
  //   enabled: env.bool('CRON_ENABLED', false),
  // },
});
