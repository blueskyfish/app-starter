import { ErrorBody } from '@blueskyfish/backend-commons';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { LoginUser, RegisterPayload } from '../entities';
import { RegisterService } from '../services';

/**
 * The endpoint `/register` is for the registration a new user.
 */
@ApiTags('User')
@Controller()
export class RegisterController {

  constructor(private registerService: RegisterService) {
  }

  @ApiOperation({
    description: 'Try to register a new user',
    operationId: 'registerUser'
  })
  @ApiCreatedResponse({
    description: 'The logged-in user',
    type: LoginUser,
  })
  @ApiNotAcceptableResponse({
    description: 'The register data is not acceptable',
    type: ErrorBody,
  })
  @ApiNotFoundResponse({
    description: 'The new user is not found',
    type: ErrorBody,
  })
  @Post('register')
  async registerUser(@Body() data: RegisterPayload): Promise<LoginUser> {
    return await this.registerService.registerUser(data);
  }
}
