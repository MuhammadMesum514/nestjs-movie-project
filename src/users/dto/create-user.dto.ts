// src/users/dto/create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  image: string;

  @IsString()
  dob: string;

  @IsString()
  @IsNotEmpty()
  // @MinLength(6)
  password: string;
}
