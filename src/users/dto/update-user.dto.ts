import { IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../user.entity";

export class UpdateUserRoleDto {
  @ApiProperty({ enum: UserRole, description: "New role for the user" })
  @IsEnum(UserRole)
  role: UserRole;
}
