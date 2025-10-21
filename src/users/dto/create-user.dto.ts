import {UserRole} from "../../common/types/roles.types";
import {
  ArrayNotEmpty,
  IsArray, IsBoolean,
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength
} from "class-validator";

export class CreateUserDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsArray()
  @ArrayNotEmpty()
  roles: UserRole[];

  @IsString()
  refreshToken: string | null;

  @IsBoolean()
  isActive: boolean;

  @IsDateString()
  dateOfBirthday: string
}