import { SubRepository } from '@blueskyfish/backend-database';
import { DbUser, DbUserLogin, DbUserPermission, DbUserInfo, DbUserSecret } from './user.db';
import * as q from './user.sql';

export class UserRepository extends SubRepository {

  /**
   * Find the user by the given email address and return the user with password and permissions
   * @param email the email address
   * @returns the user with password / permissions or `null`.
   */
  async findLoginUserByEmail(email: string): Promise<DbUserLogin | null> {
    return await this.conn.selectOne<DbUserLogin>(q.sqlFindLoginUserByEmail, { email })
  }

  /**
   * Find the user by the given email address and return the user with password and permissions
   * @param userId the user id
   * @returns the user with password /permissions or `null`.
   */
  async findLoginUserById(userId: string): Promise<DbUserLogin | null> {
    return await this.conn.selectOne<DbUserLogin>(q.sqlFindLoginUserByEmail, { userId });
  }

  /**
   * Find the user by the given email address
   * @param email the email address
   * @return the user or `null`
   */
  async findUserByEmail(email: string): Promise<DbUser | null> {
    return await this.conn.selectOne<DbUser>(q.sqlFindUserByEmail, { email });
  }

  /**
   * Find the user by the given id
   * @param userId the user id
   * @return the user with permissions or `null`
   */
  async findUserById(userId: string): Promise<DbUserInfo | null> {
    return await this.conn.selectOne<DbUserInfo>(q.sqlFindUserById, { userId });
  }

  async updateUser(data: DbUser): Promise<number> {
    return await this.conn.update(q.sqlReplaceUser, data);
  }

  async updateUserSecret(data: DbUserSecret): Promise<number> {
    return await this.conn.update(q.sqlReplaceUserSecret, data);
  }

  async updateUserPermissions(data: DbUserPermission): Promise<number> {
    return await this.conn.update(q.sqlReplaceUserPermissions, data);
  }
}
