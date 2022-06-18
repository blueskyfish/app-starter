import { Auth, AuthUser, ErrorBody, OpenApiSetting } from '@blueskyfish/backend-commons';
import { Controller, Put } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginUser } from '../entities';
import { RenewService } from '../services';

@ApiTags('User')
@Controller()
export class RenewController {

  constructor(private renewService: RenewService) {
  }

  @ApiOperation({
    description: 'Renew the user authorization',
    operationId: 'renewUser',
    security: OpenApiSetting.ApiSecurity,
  })
  @ApiOkResponse({
    description: 'The logged-in user',
    type: LoginUser,
  })
  @ApiNotFoundResponse({
    description: 'The user is not found',
    type: ErrorBody,
  })
  @ApiUnauthorizedResponse({
    description: 'The user is disabled',
    type: ErrorBody,
  })
  @Put('renew')
  async renewUser(@Auth() authUser: AuthUser): Promise<LoginUser> {
    return await this.renewService.renewUser(authUser);
  }
}
