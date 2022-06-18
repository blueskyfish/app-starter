import { NL } from '@blueskyfish/backend-database';

/**
 * Find the user by the given email address and return the user with password and permissions
 * @see DbUserLogin
 */
export const sqlFindLoginUserByEmail = [
  'SELECT u.user_id AS userId, u.name, u.email, u.enabled, us.password, up.permissions', NL,
  'FROM table(users) AS u', NL,
  '  JOIN table(userSecrets) AS us ON (u.user_id = us.user_id)', NL,
  '  JOIN table(userPermissions) AS up ON (u.user_id = up.user_id)', NL,
  'WHERE u.email = {email}'
].join('');

/**
 * Find the user by the given email address and return the user with password and permissions
 * @see DbUserLogin
 */
export const sqlFindLoginUserId = [
  'SELECT u.user_id AS userId, u.name, u.email, u.enabled, us.password, up.permissions', NL,
  'FROM table(users) AS u', NL,
  '  JOIN table(userSecrets) AS us ON (u.user_id = us.user_id)', NL,
  '  JOIN table(userPermissions) AS up ON (u.user_id = up.user_id)', NL,
  'WHERE u.user_id = {userId}'
].join('');


/**
 * @see DbUser
 */
export const sqlFindUserByEmail = [
  'SELECT u.user_id AS userId, u.name, u.email, u.enabled', NL,
  'FROM table(users) AS u', NL,
  'WHERE u.email = {email}'
].join('');

/**
 * @see DbUserInfo
 */
export const sqlFindUserById = [
  'SELECT u.user_id AS userId, u.name, u.email, u.enabled, up.permissions', NL,
  'FROM table(users) AS u', NL,
  '  JOIN table(userPermissions) AS up ON (u.user_id = up.user_id)', NL,
  'WHERE u.user_id = {userId}'
].join('');

/**
 * @see DbUser
 */
export const sqlReplaceUser = [
  'REPLACE table(users) SET', NL,
  ' `user_id` = {userId},', NL,
  ' `name` = {name},', NL,
  ' `email` = {email},', NL,
  ' `enabled` = {enabled}'
].join('');

/**
 * @see DbUserSecret
 */
export const sqlReplaceUserSecret = [
  'REPLACE table(userSecrets) SET', NL,
  '  `user_id` = {userId},', NL,
  '  `password` = {password}'
].join('');

/**
 * @see DbUserPermission
 */
export const sqlReplaceUserPermissions = [
  'REPLACE table(userPermissions) SET', NL,
  '  `user_id` = {userId},', NL,
  '  `permissions` = {permissions}'
].join('');
