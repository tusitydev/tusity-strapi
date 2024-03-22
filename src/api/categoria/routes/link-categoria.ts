// Customize routes

export default {
  routes: [
    {
      method: 'PATCH',
      path: '/categoria/link/:tipo',
      handler: 'categoria-link.link',
      config: {
        middlewares: ['api::categoria.categoria-validation'],
      },
    },
  ],
};
