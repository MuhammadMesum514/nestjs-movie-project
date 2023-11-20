// src/users/entities/user.entity.ts
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
  created_at: Date;
  updated_at: Date;
  address: string;
  image: string;
  dob: string;

  id: number;

  createdAt: Date;

  updatedAt: Date;

  name: string;

  username: string;

  @Exclude()
  password: string;
}
