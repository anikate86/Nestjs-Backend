import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../../src/auth/auth.service";
import { UsersService } from "../../src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User, UserRole } from "../../src/users/user.entity";
import * as bcrypt from "bcrypt";

describe("AuthService", () => {
  let authService: AuthService;
  let usersService: Partial<Record<keyof UsersService, jest.Mock>>;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;

  let mockUser: User;

  beforeEach(async () => {
    const hashedPassword = await bcrypt.hash("password123", 10);

    mockUser = {
      id: 1,
      email: "test@example.com",
      password: hashedPassword,
      role: UserRole.VIEWER,
      documents: [],
    };

    usersService = {
      findByEmail: jest.fn().mockResolvedValue(mockUser),
      create: jest.fn().mockResolvedValue(mockUser),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue("mocked-token"),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe("validateUser", () => {
    it("should return user data without password if valid", async () => {
      const result = await authService.validateUser(
        "test@example.com",
        "password123"
      );
      expect(result).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
        documents: [],
      });
    });

    it("should return null if password is incorrect", async () => {
      jest.spyOn(bcrypt, "compare").mockResolvedValueOnce(false as never);
      const result = await authService.validateUser(
        "test@example.com",
        "wrong-password"
      );
      expect(result).toBeNull();
    });

    it("should return null if user not found", async () => {
      (usersService.findByEmail as jest.Mock).mockResolvedValueOnce(null);
      const result = await authService.validateUser(
        "noone@example.com",
        "password"
      );
      expect(result).toBeNull();
    });
  });

  describe("login", () => {
    it("should return access_token", async () => {
      const result = await authService.login(mockUser);
      expect(result).toEqual({ access_token: "mocked-token" });
    });
  });

  describe("register", () => {
    it("should register and return token", async () => {
      const result = await authService.register({
        email: "test@example.com",
        password: "password123",
      });
      expect(result).toEqual({ access_token: "mocked-token" });
    });
  });
});
