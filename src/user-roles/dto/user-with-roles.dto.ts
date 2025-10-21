import {ResponseRoleDto} from "../../roles/dto/response-role.dto";

export class UserWithRolesDto {
  id: number;
  name: string;
  email: string;
  roles: ResponseRoleDto[];
}