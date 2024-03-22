/**
 * `categoria-validation` middleware
 */

import { type Strapi } from '@strapi/strapi';
import { isValidUUIDV4 } from 'is-valid-uuid-v4';

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const { categorias } = ctx.request.body.data;

    const every = Object.keys(ctx.request.body.data).every(
      (key) => key === 'catgorias',
    );

    if (!every) {
      return ctx.badRequest('Invalid data', { data: ctx.request.body.data });
    }

    const validUuid = categorias.find((categoria) => !isValidUUIDV4(categoria));

    if (validUuid !== undefined) {
      return ctx.badRequest('Invalid categoria uuid', {
        uuid: validUuid,
      });
    }

    const { tipo } = ctx.params;

    if (tipo !== 'disconnect' || tipo !== 'connect') {
      return ctx.badRequest('Invalid params', {
        tipo,
      });
    }

    await next();
  };
};
