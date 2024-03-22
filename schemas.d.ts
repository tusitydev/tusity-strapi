/* eslint-disable @typescript-eslint/ban-types */
import {
  type CollectionTypeSchema,
  type StringAttribute,
  type RequiredAttribute,
  type SetMinMaxLength,
  type JSONAttribute,
  type DefaultTo,
  type RelationAttribute,
  type DateTimeAttribute,
  type PrivateAttribute,
  type EmailAttribute,
  type UniqueAttribute,
  type PasswordAttribute,
  type BooleanAttribute,
  type EnumerationAttribute,
  type BigIntegerAttribute,
  type IntegerAttribute,
  type DecimalAttribute,
  type SetMinMax,
  type UIDAttribute,
  type MediaAttribute,
  type TextAttribute,
  type ComponentAttribute,
  type FloatAttribute,
  type SingleTypeSchema,
  type ComponentSchema,
} from '@strapi/strapi';

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    username: StringAttribute;
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<'admin::user', 'manyToMany', 'admin::role'> &
      PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute;
    users: RelationAttribute<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: RelationAttribute<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    type: EnumerationAttribute<['read-only', 'full-access', 'custom']> &
      RequiredAttribute &
      DefaultTo<'read-only'>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminApiTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminTransferToken extends CollectionTypeSchema {
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminTransferTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<'plugin::upload.file', 'morphToMany'>;
    folder: RelationAttribute<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      PrivateAttribute;
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    description: StringAttribute;
    type: StringAttribute & UniqueAttribute;
    permissions: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: StringAttribute;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    confirmationToken: StringAttribute & PrivateAttribute;
    confirmed: BooleanAttribute & DefaultTo<false>;
    blocked: BooleanAttribute & DefaultTo<false>;
    role: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    uuid: UIDAttribute;
    categorias: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::categoria.categoria'
    >;
    icone: MediaAttribute;
    escolas: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::escola.escola'
    >;
    comentarios: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::comentario.comentario'
    >;
    curtidas: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::curtida.curtida'
    >;
    api: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToOne',
      'api::api.api'
    >;
    notificacao: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToOne',
      'api::notificacao.notificacao'
    >;
    favorito: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::favorito.favorito'
    >;
    avaliacao: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::avaliacao.avaliacao'
    >;
    minutagems: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::minutagem.minutagem'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: StringAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiApiApi extends CollectionTypeSchema {
  info: {
    singularName: 'api';
    pluralName: 'apis';
    displayName: 'api';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    categorias: RelationAttribute<
      'api::api.api',
      'oneToMany',
      'api::categoria.categoria'
    >;
    cursos: RelationAttribute<'api::api.api', 'oneToMany', 'api::curso.curso'>;
    users: RelationAttribute<
      'api::api.api',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    comentarios: RelationAttribute<
      'api::api.api',
      'oneToMany',
      'api::comentario.comentario'
    >;
    criador_de_conteudos: RelationAttribute<
      'api::api.api',
      'oneToMany',
      'api::criador-de-conteudo.criador-de-conteudo'
    >;
    topicos: RelationAttribute<
      'api::api.api',
      'oneToMany',
      'api::topico.topico'
    >;
    curtidas: RelationAttribute<
      'api::api.api',
      'oneToMany',
      'api::curtida.curtida'
    >;
    escolas: RelationAttribute<
      'api::api.api',
      'oneToMany',
      'api::escola.escola'
    >;
    avaliacaos: RelationAttribute<
      'api::api.api',
      'oneToMany',
      'api::avaliacao.avaliacao'
    >;
    minutagens: RelationAttribute<
      'api::api.api',
      'oneToMany',
      'api::minutagem.minutagem'
    >;
    pilulas: RelationAttribute<
      'api::api.api',
      'oneToMany',
      'api::pilula.pilula'
    >;
    notificacaos: RelationAttribute<
      'api::api.api',
      'oneToMany',
      'api::notificacao.notificacao'
    >;
    favoritos: RelationAttribute<
      'api::api.api',
      'oneToMany',
      'api::favorito.favorito'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::api.api', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::api.api', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface ApiAvaliacaoAvaliacao extends CollectionTypeSchema {
  info: {
    singularName: 'avaliacao';
    pluralName: 'avaliacoes';
    displayName: 'Avaliacao';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    uuid: UIDAttribute;
    pontuacao: IntegerAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
        max: 5;
      }>;
    user: RelationAttribute<
      'api::avaliacao.avaliacao',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    curso: RelationAttribute<
      'api::avaliacao.avaliacao',
      'manyToOne',
      'api::curso.curso'
    >;
    api: RelationAttribute<
      'api::avaliacao.avaliacao',
      'manyToOne',
      'api::api.api'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::avaliacao.avaliacao',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::avaliacao.avaliacao',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCategoriaCategoria extends CollectionTypeSchema {
  info: {
    singularName: 'categoria';
    pluralName: 'categorias';
    displayName: 'categoria';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nome: StringAttribute & RequiredAttribute & UniqueAttribute;
    icone: MediaAttribute & RequiredAttribute;
    cursos: RelationAttribute<
      'api::categoria.categoria',
      'manyToMany',
      'api::curso.curso'
    >;
    users: RelationAttribute<
      'api::categoria.categoria',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    api: RelationAttribute<
      'api::categoria.categoria',
      'manyToOne',
      'api::api.api'
    >;
    uuid: UIDAttribute;
    notificacaos: RelationAttribute<
      'api::categoria.categoria',
      'oneToMany',
      'api::notificacao.notificacao'
    >;
    pilulas: RelationAttribute<
      'api::categoria.categoria',
      'manyToMany',
      'api::pilula.pilula'
    >;
    topicos: RelationAttribute<
      'api::categoria.categoria',
      'oneToMany',
      'api::topico.topico'
    >;
    descricao: TextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::categoria.categoria',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::categoria.categoria',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiComentarioComentario extends CollectionTypeSchema {
  info: {
    singularName: 'comentario';
    pluralName: 'comentarios';
    displayName: 'comentario';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    uuid: UIDAttribute;
    text: TextAttribute & RequiredAttribute;
    user: RelationAttribute<
      'api::comentario.comentario',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    denuncia: IntegerAttribute & DefaultTo<0>;
    topico: RelationAttribute<
      'api::comentario.comentario',
      'manyToOne',
      'api::topico.topico'
    >;
    curtidas: RelationAttribute<
      'api::comentario.comentario',
      'oneToMany',
      'api::curtida.curtida'
    >;
    api: RelationAttribute<
      'api::comentario.comentario',
      'manyToOne',
      'api::api.api'
    >;
    filhos: RelationAttribute<
      'api::comentario.comentario',
      'oneToMany',
      'api::comentario.comentario'
    >;
    pai: RelationAttribute<
      'api::comentario.comentario',
      'manyToOne',
      'api::comentario.comentario'
    >;
    ordem: IntegerAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 0;
        max: 1;
      }> &
      DefaultTo<0>;
    deleted: BooleanAttribute & RequiredAttribute & DefaultTo<false>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::comentario.comentario',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::comentario.comentario',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCriadorDeConteudoCriadorDeConteudo
  extends CollectionTypeSchema {
  info: {
    singularName: 'criador-de-conteudo';
    pluralName: 'criador-de-conteudos';
    displayName: 'criadorDeConteudo';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nome: StringAttribute & RequiredAttribute;
    icone: MediaAttribute;
    cursos: RelationAttribute<
      'api::criador-de-conteudo.criador-de-conteudo',
      'manyToMany',
      'api::curso.curso'
    >;
    descricao: TextAttribute;
    instagram: StringAttribute;
    linkedIn: StringAttribute;
    facebook: StringAttribute;
    api: RelationAttribute<
      'api::criador-de-conteudo.criador-de-conteudo',
      'manyToOne',
      'api::api.api'
    >;
    pilulas: RelationAttribute<
      'api::criador-de-conteudo.criador-de-conteudo',
      'oneToMany',
      'api::pilula.pilula'
    >;
    uuid: UIDAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::criador-de-conteudo.criador-de-conteudo',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::criador-de-conteudo.criador-de-conteudo',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCursoCurso extends CollectionTypeSchema {
  info: {
    singularName: 'curso';
    pluralName: 'cursos';
    displayName: 'curso';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nome: StringAttribute & RequiredAttribute;
    categorias: RelationAttribute<
      'api::curso.curso',
      'manyToMany',
      'api::categoria.categoria'
    >;
    uuid: UIDAttribute;
    descricao: TextAttribute;
    aulas: ComponentAttribute<'aula.aulas', true>;
    imagem: MediaAttribute;
    criador_de_conteudos: RelationAttribute<
      'api::curso.curso',
      'manyToMany',
      'api::criador-de-conteudo.criador-de-conteudo'
    >;
    minutagem: FloatAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 0;
      }>;
    api: RelationAttribute<'api::curso.curso', 'manyToOne', 'api::api.api'>;
    minutagens: RelationAttribute<
      'api::curso.curso',
      'oneToMany',
      'api::minutagem.minutagem'
    >;
    avaliacaos: RelationAttribute<
      'api::curso.curso',
      'oneToMany',
      'api::avaliacao.avaliacao'
    >;
    notificacao: RelationAttribute<
      'api::curso.curso',
      'manyToOne',
      'api::notificacao.notificacao'
    >;
    favoritos: RelationAttribute<
      'api::curso.curso',
      'manyToMany',
      'api::favorito.favorito'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::curso.curso',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::curso.curso',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCurtidaCurtida extends CollectionTypeSchema {
  info: {
    singularName: 'curtida';
    pluralName: 'curtidas';
    displayName: 'curtida';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    comentario: RelationAttribute<
      'api::curtida.curtida',
      'manyToOne',
      'api::comentario.comentario'
    >;
    user: RelationAttribute<
      'api::curtida.curtida',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    tipo: EnumerationAttribute<['topico', 'comentario']> & RequiredAttribute;
    topico: RelationAttribute<
      'api::curtida.curtida',
      'manyToOne',
      'api::topico.topico'
    >;
    uuid: UIDAttribute;
    api: RelationAttribute<'api::curtida.curtida', 'manyToOne', 'api::api.api'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::curtida.curtida',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::curtida.curtida',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiEscolaEscola extends CollectionTypeSchema {
  info: {
    singularName: 'escola';
    pluralName: 'escolas';
    displayName: 'escola';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nome: StringAttribute & RequiredAttribute;
    imagem: MediaAttribute & RequiredAttribute;
    segmento: StringAttribute;
    uuid: UIDAttribute & PrivateAttribute;
    clusterDaEscola: StringAttribute;
    acessosPais: IntegerAttribute & RequiredAttribute;
    acessosEducadores: IntegerAttribute & RequiredAttribute;
    acessosAdmin: IntegerAttribute & RequiredAttribute;
    numeroDeAlunos: IntegerAttribute & RequiredAttribute;
    users: RelationAttribute<
      'api::escola.escola',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    api: RelationAttribute<'api::escola.escola', 'manyToOne', 'api::api.api'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::escola.escola',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::escola.escola',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiFavoritoFavorito extends CollectionTypeSchema {
  info: {
    singularName: 'favorito';
    pluralName: 'favoritos';
    displayName: 'favorito';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    api: RelationAttribute<
      'api::favorito.favorito',
      'manyToOne',
      'api::api.api'
    >;
    uuid: UIDAttribute;
    cursos: RelationAttribute<
      'api::favorito.favorito',
      'manyToMany',
      'api::curso.curso'
    >;
    pilulas: RelationAttribute<
      'api::favorito.favorito',
      'manyToMany',
      'api::pilula.pilula'
    >;
    blog: ComponentAttribute<'blog.blog', true>;
    educast: ComponentAttribute<'educast.educast', true>;
    user: RelationAttribute<
      'api::favorito.favorito',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    tipo: EnumerationAttribute<['adicionar', 'deletar']> & RequiredAttribute;
    topicos: RelationAttribute<
      'api::favorito.favorito',
      'manyToMany',
      'api::topico.topico'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::favorito.favorito',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::favorito.favorito',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiMinutagemMinutagem extends CollectionTypeSchema {
  info: {
    singularName: 'minutagem';
    pluralName: 'minutagens';
    displayName: 'Minutagem';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    uuid: UIDAttribute;
    tempo: FloatAttribute & RequiredAttribute & DefaultTo<0>;
    user: RelationAttribute<
      'api::minutagem.minutagem',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    api: RelationAttribute<
      'api::minutagem.minutagem',
      'manyToOne',
      'api::api.api'
    >;
    aula: IntegerAttribute & RequiredAttribute;
    curso: RelationAttribute<
      'api::minutagem.minutagem',
      'manyToOne',
      'api::curso.curso'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::minutagem.minutagem',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::minutagem.minutagem',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiNotificacaoNotificacao extends CollectionTypeSchema {
  info: {
    singularName: 'notificacao';
    pluralName: 'notificacaos';
    displayName: 'Notificacao';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    uuid: UIDAttribute;
    texto: StringAttribute & RequiredAttribute;
    users: RelationAttribute<
      'api::notificacao.notificacao',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    cursos: RelationAttribute<
      'api::notificacao.notificacao',
      'oneToMany',
      'api::curso.curso'
    >;
    categoria: RelationAttribute<
      'api::notificacao.notificacao',
      'manyToOne',
      'api::categoria.categoria'
    >;
    api: RelationAttribute<
      'api::notificacao.notificacao',
      'manyToOne',
      'api::api.api'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::notificacao.notificacao',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::notificacao.notificacao',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiPilulaPilula extends CollectionTypeSchema {
  info: {
    singularName: 'pilula';
    pluralName: 'pilulas';
    displayName: 'Pilula';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    uuid: UIDAttribute;
    titulo: StringAttribute & RequiredAttribute;
    descricao: TextAttribute;
    criador_de_conteudo: RelationAttribute<
      'api::pilula.pilula',
      'manyToOne',
      'api::criador-de-conteudo.criador-de-conteudo'
    >;
    api: RelationAttribute<'api::pilula.pilula', 'manyToOne', 'api::api.api'>;
    video: StringAttribute & RequiredAttribute;
    favoritos: RelationAttribute<
      'api::pilula.pilula',
      'manyToMany',
      'api::favorito.favorito'
    >;
    categorias: RelationAttribute<
      'api::pilula.pilula',
      'manyToMany',
      'api::categoria.categoria'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::pilula.pilula',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::pilula.pilula',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiTermoTermo extends SingleTypeSchema {
  info: {
    singularName: 'termo';
    pluralName: 'termos';
    displayName: 'termo';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    termo: TextAttribute & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::termo.termo',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::termo.termo',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiTopicoTopico extends CollectionTypeSchema {
  info: {
    singularName: 'topico';
    pluralName: 'topicos';
    displayName: 'topico';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    titulo: StringAttribute & RequiredAttribute;
    pergunta: StringAttribute;
    categoria: RelationAttribute<
      'api::topico.topico',
      'manyToOne',
      'api::categoria.categoria'
    >;
    imagem: MediaAttribute;
    enquete: ComponentAttribute<'enquente.enquentes', true>;
    tipo: EnumerationAttribute<['enquete', 'comentario', 'simOuNao ']> &
      RequiredAttribute;
    uuid: UIDAttribute;
    comentarios: RelationAttribute<
      'api::topico.topico',
      'oneToMany',
      'api::comentario.comentario'
    >;
    curtidas: RelationAttribute<
      'api::topico.topico',
      'oneToMany',
      'api::curtida.curtida'
    >;
    api: RelationAttribute<'api::topico.topico', 'manyToOne', 'api::api.api'>;
    favoritos: RelationAttribute<
      'api::topico.topico',
      'manyToMany',
      'api::favorito.favorito'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::topico.topico',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::topico.topico',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AulaAulas extends ComponentSchema {
  info: {
    displayName: 'aulas';
    description: '';
  };
  attributes: {
    nome: StringAttribute & RequiredAttribute;
    descricao: TextAttribute;
    tempo: FloatAttribute & DefaultTo<0>;
    video: StringAttribute & RequiredAttribute;
  };
}

export interface BlogBlog extends ComponentSchema {
  info: {
    displayName: 'Blog';
    description: '';
  };
  attributes: {
    url: StringAttribute & RequiredAttribute;
  };
}

export interface EducastEducast extends ComponentSchema {
  info: {
    displayName: 'Educast';
    description: '';
  };
  attributes: {
    url: StringAttribute & RequiredAttribute;
  };
}

export interface EnquenteEnquentes extends ComponentSchema {
  info: {
    displayName: 'enquentes';
    description: '';
  };
  attributes: {
    opcao: StringAttribute & RequiredAttribute;
    count: IntegerAttribute & RequiredAttribute & DefaultTo<0>;
    users: RelationAttribute<
      'enquente.enquentes',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    voted: BooleanAttribute & DefaultTo<false>;
    percentage: FloatAttribute &
      SetMinMax<{
        min: 0;
        max: 10000;
      }> &
      DefaultTo<0>;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::api.api': ApiApiApi;
      'api::avaliacao.avaliacao': ApiAvaliacaoAvaliacao;
      'api::categoria.categoria': ApiCategoriaCategoria;
      'api::comentario.comentario': ApiComentarioComentario;
      'api::criador-de-conteudo.criador-de-conteudo': ApiCriadorDeConteudoCriadorDeConteudo;
      'api::curso.curso': ApiCursoCurso;
      'api::curtida.curtida': ApiCurtidaCurtida;
      'api::escola.escola': ApiEscolaEscola;
      'api::favorito.favorito': ApiFavoritoFavorito;
      'api::minutagem.minutagem': ApiMinutagemMinutagem;
      'api::notificacao.notificacao': ApiNotificacaoNotificacao;
      'api::pilula.pilula': ApiPilulaPilula;
      'api::termo.termo': ApiTermoTermo;
      'api::topico.topico': ApiTopicoTopico;
      'aula.aulas': AulaAulas;
      'blog.blog': BlogBlog;
      'educast.educast': EducastEducast;
      'enquente.enquentes': EnquenteEnquentes;
    }
  }
}
