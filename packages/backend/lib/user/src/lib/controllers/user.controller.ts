import { Auth, AuthUser, ErrorBody, OpenApiSetting } from '@blueskyfish/backend-commons';
import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChangePasswordPayload, ChangeUserPayload, UserInfo } from '../entities';
import { UserService } from '../services';

@ApiTags('User')
@Controller()
export class UserController {

  constructor(private userService: UserService) {
  }

  @ApiOperation({
    description: 'The information of the current user',
    operationId: 'getUserInfo',
    security: OpenApiSetting.ApiSecurity,
  })
  @ApiOkResponse({
    description: 'The information about the current user',
    type: UserInfo,
  })
  @ApiNotFoundResponse({
    description: 'The user is not found',
    type: ErrorBody,
  })
  @ApiBadRequestResponse({
    description: 'There is no auth user',
    type: ErrorBody,
  })
  @Get('user')
  async getUserInfo(@Auth() authUser: AuthUser): Promise<UserInfo> {
    return await this.userService.getUserInfo(authUser);
  }

  @ApiOperation({
    description: 'Change the username and email',
    operationId: 'changeUser',
    security: OpenApiSetting.ApiSecurity
  })
  @ApiOkResponse({
    description: 'The information about the current user',
    type: UserInfo,
  })
  @ApiNotFoundResponse({
    description: 'The user is not found',
    type: ErrorBody,
  })
  @ApiBadRequestResponse({
    description: 'There is no auth user',
    type: ErrorBody,
  })
  @Put('user')
  async changeUser(@Auth() authUser: AuthUser, @Body() data: ChangeUserPayload): Promise<UserInfo> {
    return await this.userService.changeUser(authUser, data);
  }

  @ApiOperation({
    description: 'Change the user password',
    operationId: 'changePassword',
    security: OpenApiSetting.ApiSecurity,
  })
  @ApiOkResponse({
    description: 'The information about the current user',
    type: UserInfo,
  })
  @ApiNotFoundResponse({
    description: 'The user is not found',
    type: ErrorBody,
  })
  @ApiBadRequestResponse({
    description: 'There is no auth user',
    type: ErrorBody,
  })
  @Put('user/password')
  async changePassword(@Auth() authUser: AuthUser, @Body() data: ChangePasswordPayload): Promise<UserInfo> {
    return await this.userService.changePassword(authUser, data);
  }
}
