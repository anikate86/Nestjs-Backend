import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Body,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { Roles } from "../auth/decorators/roles.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UserRole } from "./user.entity";
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UpdateUserRoleDto } from "./dto/update-user.dto";

@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles("admin")
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(":id/role")
  @ApiOperation({ summary: "Update User Role" })
  @ApiBody({ type: UpdateUserRoleDto })
  @ApiResponse({
    status: 201,
    description: "User Role has been Updated.",
  })
  @Roles("admin")
  updateRole(@Param("id") id: number, @Body("role") role: UserRole) {
    return this.usersService.updateRole(+id, role);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post("admin-only")
  doAdminStuff() {
    return "Only admins can see this!";
  }
}
