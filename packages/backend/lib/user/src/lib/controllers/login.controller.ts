import { ErrorBody } from '@blueskyfish/backend-commons';
import { Body, Controller, Put } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginPayload, LoginUser } from '../entities';
import { LoginService } from '../services';

@ApiTags('User')
@Controller()
export class LoginController {

  constructor(private loginService: LoginService) {
  }

  @ApiOperation({
    description: 'Try to log-in the user with her credentials',
    operationId: 'loginUser'
  })
  @ApiOkResponse({
    description: 'The logged-in user',
    type: LoginUser
  })
  @ApiNotFoundResponse({
    description: 'The user is not found',
    type: ErrorBody,
  })
  @Put('login')
  async loginUser(@Body() data: LoginPayload): Promise<LoginUser> {
    return await this.loginService.loginUser(data);
  }
}
