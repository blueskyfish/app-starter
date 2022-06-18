import { ApiProperty } from '@nestjs/swagger';

/**
 * The entity of logged-in user with the auth token
 */
export class LoginUser {

  @ApiProperty()
  readonly id!: string;

  @ApiProperty()
  readonly name!: string;

  @ApiProperty()
  readonly email!: string;

  @ApiProperty({
    isArray: true,
    type: String
  })
  permissions!: string[];

  @ApiProperty()
  readonly token!: string;
}
