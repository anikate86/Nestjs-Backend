// src/auth/auth.controller.ts
import { Controller, Post, Request, UseGuards, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: "Login successFull" })
  @ApiResponse({ status: 201, description: "user is logged in" })
  @Post("login")
  async login(@Request() req): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }

  @Post("register")
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({ status: 201, description: "User created successfully" })
  async register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }
}
