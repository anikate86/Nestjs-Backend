import { IsEmail, IsString, MinLength, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../user.entity";

export class CreateUserDto {
  @ApiProperty({
    example: "user@example.com",
    description: "User email address",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "strongPassword123",
    minLength: 6,
    description: "User password",
  })
  @IsString()
  @MinLength(6)
  password: string;
}
