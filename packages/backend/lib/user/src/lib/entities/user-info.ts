import { ApiProperty } from '@nestjs/swagger';

/**
 * The user info
 */
export class UserInfo {

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

}
