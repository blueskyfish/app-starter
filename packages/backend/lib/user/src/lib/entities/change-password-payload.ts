import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

/**
 * The user password payload
 */
export class ChangePasswordPayload {
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  @ApiProperty()
  oldPassword!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(60)
  @ApiProperty()
  newPassword!: string;
}
