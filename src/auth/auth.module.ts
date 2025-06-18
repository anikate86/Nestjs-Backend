import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy"; // ⬅️ Needed for login
import { LocalAuthGuard } from "./guards/local-auth.guard"; // ⬅️ Optional, if used in providers

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // ✅ Use process.env.JWT_SECRET in production
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy, // ✅ required if you're using `LocalAuthGuard`
    LocalAuthGuard, // Optional: if you're using it as a provider
  ],
  exports: [AuthService], // Optional: for testing or other modules
})
export class AuthModule {}
