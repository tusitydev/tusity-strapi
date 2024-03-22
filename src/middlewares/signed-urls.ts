/* eslint-disable @typescript-eslint/return-await */

import { type Strapi } from '@strapi/strapi';

import * as aws from '../../providers/aws-s3';

export default (config, { strapi }: { strapi: Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    try {
      const awsClient = aws.default.init(config);

      await next();

      const isUrl = (node) => {
        if (typeof node !== 'object') return false;

        const keys = Object.keys(node);

        return (
          keys.includes('id') &&
          keys.includes('url') &&
          keys.includes('provider') &&
          keys.includes('hash')
        );
      };

      const signUrlsRecursively = async (data) => {
        const walker = async (node) => {
          if (node === null || node === undefined) return node;

          if (Array.isArray(node)) return Promise.all(node.map(walker));

          if (isUrl(node)) return awsClient.getSignedUrl(node);

          if (typeof node === 'object') {
            const mappedEntriesPromise = Object.entries(node).map(
              async ([key, value]) => {
                return [key, await walker(value)];
              },
            );

            return Object.fromEntries(await Promise.all(mappedEntriesPromise));
          }

          return node;
        };

        return walker(data);
      };

      const result = await signUrlsRecursively(ctx.response.body.data[0]);

      return (ctx.response.body.data[0] = result);
    } catch (error) {
      ctx.badRequest(error);
    }
  };
};
