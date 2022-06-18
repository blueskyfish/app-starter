import { ApiProperty } from '@nestjs/swagger';

/**
 * The entity of the user with her email address
 */
export class UserEmail {

  @ApiProperty()
  readonly id!: string;

  @ApiProperty()
  readonly name!: string;

  @ApiProperty()
  readonly email!: string;
}
