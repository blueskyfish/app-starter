import { AuthData, notFound } from '@blueskyfish/backend-commons';
import { DatabaseService } from '@blueskyfish/backend-database';
import { QueuePublisherService } from '@blueskyfish/backend-queue';
import { QueueAction, QueueChannel, QueueUser } from '@blueskyfish/backend-commons';
import { Injectable, Logger } from '@nestjs/common';
import { DateTime } from 'luxon';
import { LoginPayload, LoginUser } from '../entities';
import { PasswordService } from '../password';
import { UserRepository } from '../repository';

@Injectable()
export class LoginService {

  private readonly logger = new Logger(LoginService.name);

  constructor(
    private database: DatabaseService,
    private passwordService: PasswordService,
    private queuePublisher: QueuePublisherService
  ) {
  }

  async loginUser(data: LoginPayload): Promise<LoginUser> {
    return await this.database
      .withPool<LoginUser>(UserRepository)
      .run(async (pool) => {
        const userRepo = pool.get(UserRepository);

        const dbUser = await userRepo.findLoginUserByEmail(data.email);
        if (!dbUser) {
          throw notFound({ code: 'login.notFound', message: 'The user is not found'});
        }
        if (!this.passwordService.checkPassword(dbUser.password, data.password)) {
          this.logger.warn(`User "${data.email}" with incorrect password`);
          throw notFound({ code: 'login.notFound', message: 'The user is not found'});
        }

        // Publish "update" from the user
        await this.queuePublisher.publish<QueueUser>(QueueChannel.User, {
          action: QueueAction.Update,
          id: dbUser.userId,
          name: dbUser.name,
        });

        const permissions: string[] = JSON.parse(dbUser.permissions);
        const authData: AuthData = {
          id: dbUser.userId,
          permissions,
          creation: DateTime.now().toSeconds()
        };
        const token = this.passwordService.encryptData(authData);

        // build the response "LoginUser"
        return {
          id: dbUser.userId,
          name: dbUser.name,
          email: dbUser.email,
          permissions,
          token,
        } as LoginUser;
      });
  }
}
