import { ApiProperty } from '@nestjs/swagger';

export class LoginPayload {
  @ApiProperty()
  readonly email!: string;
  @ApiProperty()
  readonly password!: string;
}
