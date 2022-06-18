import { AuthData, notAccept, notFound, QueueAction, QueueChannel, QueueUser } from '@blueskyfish/backend-commons';
import { DatabaseService, Enable } from '@blueskyfish/backend-database';
import { QueuePublisherService } from '@blueskyfish/backend-queue';
import { Permission } from '@blueskyfish/commons';
import { uuid } from '@blueskyfish/grundel';
import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { DateTime } from 'luxon';
import { LoginUser, RegisterPayload } from '../entities';
import { PasswordService } from '../password';
import { DbUser, DbUserPermission, DbUserSecret, UserRepository } from '../repository';

/**
 * The service registers a new user
 */
@Injectable()
export class RegisterService {

  constructor(
    private database: DatabaseService,
    private passwordService: PasswordService,
    private queuePublisher: QueuePublisherService
  ) {
  }

  /**
   * Try to register a new user.
   *
   * @param data the payload of register a new user
   * @returns LoginUser entity
   * @throws NotAcceptableException
   * @throws NotFoundException
   */
  async registerUser(data: RegisterPayload): Promise<LoginUser> {
    return await this.database
      .withPool<LoginUser>(UserRepository)
      .run(async (pool) => {
        const userRepo = pool.get(UserRepository);

        const dbTemp = await userRepo.findUserByEmail(data.email);
        if (dbTemp) {
          throw notAccept({ code: 'user.register', message: 'Register data not acceptable!'});
        }

        // The user id from uuid
        const userId = uuid();

        await pool.executeTransaction<void>(async () => {


          const userData: DbUser = {
            userId,
            name: data.name,
            email: data.email,
            enabled: Enable.Y,
          };
          await userRepo.updateUser(userData);

          const secretData: DbUserSecret = {
            userId,
            password: this.passwordService.generatePassword(data.password)
          };
          await userRepo.updateUserSecret(secretData);

          const permData: DbUserPermission = {
            userId,
            permissions: JSON.stringify([Permission.User]),
          };
          await userRepo.updateUserPermissions(permData);

          // publish "add" the user
          await this.queuePublisher.publish<QueueUser>(QueueChannel.User, {
            action: QueueAction.Add,
            id: userId,
            name: data.name
          });

        }, notAccept({ code: 'user.register', message: 'Register data not acceptable!'}));

        const dbUser = await userRepo.findUserById(userId);
        if (!dbUser) {
          throw notFound({ code: 'user.notFound', message: 'The user is not found after registration!'})
        }

        const permissions: string[] = JSON.parse(dbUser.permissions);
        const authData: AuthData = {
          id: dbUser.userId,
          permissions,
          creation: DateTime.now().toSeconds()
        };
        const token = this.passwordService.encryptData(authData);

        // build the response entity "LoginUser"
        return {
          id: dbUser.userId,
          name: dbUser.name,
          email: dbUser.email,
          permissions,
          token,
        } as LoginUser;
      })
  }
}
