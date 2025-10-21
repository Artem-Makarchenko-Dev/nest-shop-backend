import {IsString, Length, MaxLength} from "class-validator";

export class CreateRoleDto {
  @IsString()
  @Length(3, 64)
  name: string;

  @IsString()
  @MaxLength(200)
  description: string;
}