import {
  AuthUser,
  badRequest,
  DUMMY_ID,
  notFound,
  QueueAction,
  QueueChannel,
  QueueUser
} from '@blueskyfish/backend-commons';
import { DatabaseService } from '@blueskyfish/backend-database';
import { QueuePublisherService } from '@blueskyfish/backend-queue';
import { isEmpty } from '@blueskyfish/grundel';
import { Injectable } from '@nestjs/common';
import { ChangePasswordPayload, ChangeUserPayload, UserInfo } from '../entities';
import { PasswordService } from '../password';
import { DbUser, DbUserSecret, UserRepository } from '../repository';

@Injectable()
export class UserService {

  constructor(
    private database: DatabaseService,
    private passwordService: PasswordService,
    private queuePublisher: QueuePublisherService
  ) { }

  async getUserInfo(authUser: AuthUser): Promise<UserInfo> {
    if (authUser.id === DUMMY_ID) {
      throw badRequest({ code: 'user.badRequest', message: 'User is unknown'});
    }

    return await this.database
      .withPool<UserInfo>(UserRepository)
      .run(async (pool) => {

        const userRepo = pool.get(UserRepository);

        return await UserService.getUserInfoFrom(userRepo, authUser.id);
      });
  }

  async changeUser(authUser: AuthUser, data: ChangeUserPayload): Promise<UserInfo> {
    return this.database
      .withPool<UserInfo>(UserRepository)
      .run(async (pool) => {
        const userRepo = pool.get(UserRepository);

        const dbUser = await userRepo.findUserById(authUser.id);
        if (!dbUser) {
          throw notFound({ code: 'user.notFound', message: 'The user is not found'});
        }

        if (data.email && !isEmpty(data.email)) {
          const dbTemp = await userRepo.findUserByEmail(data.email);
          if (dbTemp && dbTemp.userId !== authUser.id) {
            throw badRequest({ code: 'user.badEmail', message: 'Email is already using'});
          }
        }

        await pool.executeTransaction<void>(async () => {

          const userData: DbUser = {
            userId: authUser.id,
            name: data.name,
            email: data.email ?? dbUser.email,
            enabled: dbUser.enabled,
          };
          await userRepo.updateUser(userData);

          await this.queuePublisher.publish<QueueUser>(QueueChannel.User, {
            action: QueueAction.Update,
            id: authUser.id,
            name: data.name,
          })

        }, badRequest({ code: 'user.saveFailed', message: 'Save user data is failed'}));

        return await UserService.getUserInfoFrom(userRepo, authUser.id);
      });
  }

  changePassword(authUser: AuthUser, data: ChangePasswordPayload): Promise<UserInfo> {
    return this.database
      .withPool<UserInfo>(UserRepository)
      .run( async (pool) => {
        const userRepo = pool.get(UserRepository);

        const dbUser = await userRepo.findLoginUserById(authUser.id);
        if (!dbUser) {
          throw notFound({ code: 'user.notFound', message: 'User is not found'});
        }

        if (!this.passwordService.checkPassword(dbUser.password, data.oldPassword)) {
          throw notFound({ code: 'user.badPassword', message: 'Password does not fit'});
        }

        await pool.executeTransaction(async () => {

          const password = this.passwordService.generatePassword(data.newPassword);
          const userPassword: DbUserSecret = {
            userId: authUser.id,
            password,
          };
          await userRepo.updateUserSecret(userPassword);
        }, badRequest({ code: 'user.saveFailed', message: 'Password save is failed'}));

        return await UserService.getUserInfoFrom(userRepo, authUser.id);
      })

  }

  private static async getUserInfoFrom(userRepo: UserRepository, userId: string): Promise<UserInfo> {
    const dbUser = await userRepo.findUserById(userId);
    if (!dbUser) {
      throw notFound({ code: 'user.notFound', message: 'User not found'})
    }

    const permissions = JSON.parse(dbUser.permissions);

    // build the response "UserInfo"
    return {
      id: dbUser.userId,
      name: dbUser.name,
      email: dbUser.email,
      permissions,
    } as UserInfo;
  }
}
