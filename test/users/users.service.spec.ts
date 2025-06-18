import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../../src/users/users.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User, UserRole } from "../../src/users/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

describe("UsersService", () => {
  let service: UsersService;
  let repo: Repository<User>;

  const usersArray = [
    {
      id: 1,
      email: "user1@example.com",
      password: "hashed",
      role: UserRole.VIEWER,
    },
    {
      id: 2,
      email: "admin@example.com",
      password: "hashed",
      role: UserRole.ADMIN,
    },
  ];

  const mockRepo = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it("should create a new user with hashed password", async () => {
    const password = "password123";
    const email = "test@example.com";

    const user = {
      email,
      password,
    };

    const hashed = await bcrypt.hash(password, 10);
    mockRepo.save.mockResolvedValue({ ...user, password: hashed });

    const result = await service.create(user);
    expect(result.email).toBe(email);
    expect(result.password).not.toBe(password);
    expect(mockRepo.save).toHaveBeenCalled();
  });

  it("should return all users", async () => {
    mockRepo.find.mockResolvedValue(usersArray);

    const result = await service.findAll();
    expect(result).toEqual(usersArray);
    expect(mockRepo.find).toHaveBeenCalled();
  });

  it("should update user role", async () => {
    mockRepo.findOne.mockResolvedValue(usersArray[0]);
    mockRepo.save.mockResolvedValue({ ...usersArray[0], role: UserRole.ADMIN });

    const result = await service.updateRole(1, UserRole.EDITOR);

    expect(result).not.toBeNull(); // ✅ check for null first
    if (result) {
      expect(result.role).toBe(UserRole.EDITOR); // ✅ safe access
    }
    expect(mockRepo.save).toHaveBeenCalled();
  });

  it("should return null if user not found on update", async () => {
    mockRepo.findOne.mockResolvedValue(null);
    const result = await service.updateRole(99, UserRole.EDITOR);
    expect(result).toBeNull();
  });

  it("should find user by email", async () => {
    const email = "admin@example.com";
    mockRepo.findOne.mockResolvedValue(usersArray[1]);

    const result = await service.findByEmail(email);
    expect(result?.email).toBe(email);
    expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { email } });
  });
});
