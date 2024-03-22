export default ({ env }) => ({
  // Here you can do some configurations to the admin painel

  auth: {
    events: {
      onConnectionSuccess(e) {
        console.log(e.user, e.provider);
      },
      onConnectionError(e) {
        console.error(e.error, e.provider);
      },
    },
    options: {
      expiresIn: '7d',
    },
    secret: env('ADMIN_JWT_SECRET'),
  },
  auditLogs: {
    enabled: env.bool('AUDIT_LOGS_ENABLED', true),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },

  // only use if absolutely required.

  // url: env('PUBLIC_ADMIN_URL', '/dashboard'),
  // autoOpen: false,
  // watchIgnoreFiles: [
  //   './my-custom-folder', // Folder
  //   './scripts/someScript.sh', // File
  // ],
  // host: 'localhost', // Only used for --watch-admin
  // port: 8003, // Only used for --watch-admin
  // serveAdminPanel: env.bool('SERVE_ADMIN', true),
  // forgotPassword: {
  //   from: 'no-reply@example.com',
  //   replyTo: 'no-reply@example.com',
  // },
  // rateLimit: {
  //   interval: { hour: 1, min: 30 },
  //   timeWait: 3 * 1000,
  //   max: 10,
  // },
});
