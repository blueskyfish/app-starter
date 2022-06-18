import { AuthData, AuthUser, notFound, unauthorized } from '@blueskyfish/backend-commons';
import { DatabaseService, Enable } from '@blueskyfish/backend-database';
import { QueuePublisherService } from '@blueskyfish/backend-queue';
import { LoginUser } from '../entities';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { PasswordService } from '../password';
import { UserRepository } from '../repository';

@Injectable()
export class RenewService {

  constructor(
    private database: DatabaseService,
    private passwordService: PasswordService,
    private queuePublisher: QueuePublisherService
  ) {
  }

  async renewUser(authUser: AuthUser): Promise<LoginUser> {
    return this.database
      .withPool<LoginUser>(UserRepository)
      .run(async (pool) => {
        const userRepo = pool.get(UserRepository);

        const dbUser = await userRepo.findUserById(authUser.id);
        if (!dbUser) {
          throw notFound({ code: 'user.notFound', message: 'User not found'});
        }

        if (dbUser.enabled === Enable.N) {
          throw unauthorized({ code: 'user.disabled', message: 'User is disabled' });
        }

        // prepare response
        const permissions = JSON.parse(dbUser.permissions);
        const authData: AuthData = {
          id: authUser.id,
          permissions,
          creation: DateTime.now().toSeconds()
        };
        const token = this.passwordService.encryptData(authData);

        // build the "LoginUser"
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
