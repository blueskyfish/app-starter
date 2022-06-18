import { ApiProperty } from '@nestjs/swagger';

/**
 * The payload entity of the new user
 */
export class RegisterPayload {
  @ApiProperty()
  name!: string;
  @ApiProperty()
  readonly email!: string;
  @ApiProperty()
  readonly password!: string;
}
