import { Enable } from '@blueskyfish/backend-database';

/**
 * DB entity for the table **users**
 */
export type DbUser = {
  userId: string;
  name: string;
  email: string;
  enabled: Enable;
};

/**
 * DB Entity for the table **user_secrets**
 */
export type DbUserSecret = {
  userId: string;
  password: string;
};

/**
 * DB Entity for the table **user_permissions**
 */
export type DbUserPermission = {
  userId: string;
  permissions: string;
}

/**
 * DB entity for the user with password and permissions
 */
export type DbUserLogin = {
  userId: string;
  name: string;
  email: string;
  enabled: Enable;
  permissions: string;
  password: string;
};

/**
 * DB entity for the user with permissions
 */
export type DbUserInfo = {
  userId: string;
  name: string;
  email: string;
  enabled: Enable;
  permissions: string;
}
