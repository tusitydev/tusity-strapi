/* eslint-disable no-param-reassign */
/* eslint-disable import/no-import-module-exports */
import {
  validateCallbackBody,
  validateRegisterBody,
} from '@strapi/plugin-users-permissions/server/controllers/validation/auth';
import { getService } from '@strapi/plugin-users-permissions/server/utils';
import utils from '@strapi/utils';
import _ = require('lodash');

import * as aws from '../../../providers/aws-s3';
import { config } from '../../../shared/utils';

const { sanitize } = utils;
const { ApplicationError, ValidationError } = utils.errors;

const sanitizeUser = (user, ctx) => {
  const { auth } = ctx.state;
  const userSchema = strapi.getModel('plugin::users-permissions.user');

  return sanitize.contentAPI.output(user, userSchema, { auth });
};

module.exports = (plugin) => {
  // change logins logic
  plugin.controllers.auth.callback = async (ctx) => {
    const provider = ctx.params.provider || 'local';
    const params = ctx.request.body;

    const store = strapi.store({ type: 'plugin', name: 'users-permissions' });
    const grantSettings = await store.get({ key: 'grant' });
    const grantProvider = provider === 'local' ? 'email' : provider;

    if (!_.get(grantSettings, [grantProvider, 'enabled'])) {
      throw new ApplicationError('This provider is disabled');
    }

    if (provider === 'local') {
      await validateCallbackBody(params);

      const { identifier } = params;

      // Check if the user exists.
      const user = await strapi
        .query('plugin::users-permissions.user')
        .findOne({
          where: {
            provider,
            $or: [
              { email: identifier.toLowerCase() },
              { username: identifier },
            ],
          },
          populate: ['role', 'icone'],
        });

      if (!user) {
        throw new ValidationError('Invalid identifier or password');
      }

      if (!user.password) {
        throw new ValidationError('Invalid identifier or password');
      }

      const validPassword = await getService('user').validatePassword(
        params.password,
        user.password,
      );

      if (!validPassword) {
        throw new ValidationError('Invalid identifier or password');
      }

      const advancedSettings = await store.get({ key: 'advanced' });
      const requiresConfirmation = _.get(
        advancedSettings,
        'email_confirmation',
      );

      if (requiresConfirmation && user.confirmed !== true) {
        throw new ApplicationError('Your account email is not confirmed');
      }

      if (user.blocked === true) {
        throw new ApplicationError(
          'Your account has been blocked by an administrator',
        );
      }

      const userSanitized = await sanitizeUser(user, ctx);

      const iconeSigned = await aws.default
        .init(config)
        .getSignedUrl(userSanitized.icone);

      return ctx.send({
        jwt: getService('jwt').issue({ id: user.id }),
        user: { ...userSanitized, icone: iconeSigned },
      });
    }

    // Connect the user with the third-party provider.
    try {
      const user = await getService('providers').connect(provider, ctx.query);

      return ctx.send({
        jwt: getService('jwt').issue({ id: user.id }),
        user: await sanitizeUser(user, ctx),
      });
    } catch (error) {
      throw new ApplicationError(error.message);
    }
  };
  // change create user logic
  plugin.controllers.auth.register = async (ctx) => {
    const { password, email, username, role } = ctx.request.body;

    const pluginStore = await strapi.store({
      type: 'plugin',
      name: 'users-permissions',
    });

    const settings = await pluginStore.get({ key: 'advanced' });

    if (!settings.allow_register) {
      throw new ApplicationError('Register action is currently disabled');
    }

    const params = {
      ..._.omit(ctx.request.body, [
        'confirmed',
        'blocked',
        'confirmationToken',
        'resetPasswordToken',
        'provider',
      ]),
      provider: 'local',
      email,
      password,
      username,
    };

    await validateRegisterBody(params);

    const newRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { id: role } });

    if (!newRole) {
      throw new ApplicationError('Impossible to find the default role');
    }

    const identifierFilter = {
      $or: [
        { email: params.email.toLowerCase() },
        { username: params.email.toLowerCase() },
        { username: params.username },
        { email: params.username },
      ],
    };

    const conflictingUserCount = await strapi
      .query('plugin::users-permissions.user')
      .count({
        where: { ...identifierFilter, provider: params.provider },
      });

    if (conflictingUserCount > 0) {
      throw new ApplicationError('Email or Username are already taken');
    }

    if (settings.unique_email) {
      const conflictingUserCounts = await strapi
        .query('plugin::users-permissions.user')
        .count({
          where: { ...identifierFilter },
        });

      if (conflictingUserCounts > 0) {
        throw new ApplicationError('Email or Username are already taken');
      }
    }

    const newUser = {
      ...params,
      role: newRole.id,
      email: email.toLowerCase(),
      username,
      confirmed: !settings.email_confirmation,
    };

    const user = await getService('user').add(newUser);

    const sanitizedUser = await sanitizeUser(user, ctx);

    if (settings.email_confirmation) {
      try {
        await getService('user').sendConfirmationEmail(sanitizedUser);
      } catch (err) {
        throw new ApplicationError(err.message);
      }

      return ctx.send({ user: sanitizedUser });
    }

    const jwt = getService('jwt').issue(_.pick(user, ['id']));

    return ctx.send({
      jwt,
      user: sanitizedUser,
    });
  };
  return plugin;
};
