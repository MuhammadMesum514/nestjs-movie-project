import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Type } from 'class-transformer';

@ValidatorConstraint({ name: 'isArrayNumber' })
export class isArrayNumber implements ValidatorConstraintInterface {
  validate(numbers: number[]): boolean {
    if (typeof numbers === 'number') {
      return false;
    }

    if (numbers) {
      return numbers.every((number) => !Number.isNaN(number));
    }
    return false;
  }
}
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  dob?: string;

  @IsArray()
  @IsOptional()
  @Type(() => Number)
  @Validate(isArrayNumber, { message: 'Category Id Should be a number' })
  categories: number[];
}
