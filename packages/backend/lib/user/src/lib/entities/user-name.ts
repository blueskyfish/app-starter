import { ApiProperty } from '@nestjs/swagger';

/**
 * The username
 */
export class UserName {

  @ApiProperty()
  readonly id!: string;

  @ApiProperty()
  readonly name!: string;
}
