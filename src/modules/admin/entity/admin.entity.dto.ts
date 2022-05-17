import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
}
