import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

/**
 * Change the username and email
 */
export class ChangeUserPayload {

  @IsString()
  @MaxLength(120)
  @MinLength(3)
  @ApiProperty()
  name!: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    required: false
  })
  email?: string;
}
