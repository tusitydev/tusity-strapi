// Method 1: Creating an entirely custom service

import { type Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async orderByCategories({ userId, data }) {
    const user = await strapi.entityService.findOne(
      'plugin::users-permissions.user',
      userId,
      {
        fields: ['email'],
        populate: {
          categorias: {
            fields: ['nome'],
          },
        },
      },
    );

    const userCatagories = user.categorias.map((category) => category.nome);

    if (userCatagories.length) {
      data.sort((a, b) => {
        const findA = a.attributes.categorias.data.some((categoria) =>
          userCatagories.find(
            (userCatagory) => userCatagory === categoria.attributes.nome,
          ),
        );

        const findB = b.attributes.categorias.data.some((categoria) =>
          userCatagories.find(
            (userCatagory) => userCatagory === categoria.attributes.nome,
          ),
        );

        if (!findA && findB) {
          return 1;
        }
        if (findA && !findB) {
          return -1;
        }

        return 0;
      });
    }

    return data;
  },
});
