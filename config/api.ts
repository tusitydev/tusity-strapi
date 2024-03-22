export default {
  responses: {
    privateAttributes: ['_v', 'id', 'updatedAt'],
  },
  rest: {
    prefix: '/api',
    withCount: true,
    defaultLimit: 100,
    maxLimit: 250,
  },
};
