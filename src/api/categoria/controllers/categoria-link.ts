// Method 1: Creating an entirely custom action
import { type Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async link(ctx) {
    try {
      const { tipo } = ctx.params;

      const { categorias } = ctx.request.body.data;

      const findManyCategorias = await strapi.entityService.findMany(
        'api::categoria.categoria',
        {
          filters: { uuid: { $in: categorias } },
        },
      );

      if (findManyCategorias.length !== categorias.length) {
        ctx.badRequest('some categories not found');
      }

      await strapi.entityService.update(
        'plugin::users-permissions.user',
        ctx.state.user.id,
        {
          data: {
            categorias: {
              [tipo]: findManyCategorias.map((categoria) => categoria.id),
            },
          },
        },
      );

      return tipo;
    } catch (error) {
      ctx.badRequest(error.message);
    }
  },
});
