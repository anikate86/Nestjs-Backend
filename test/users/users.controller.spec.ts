import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../src/users/users.controller';
import { UsersService } from '../../src/users/users.service';
import { UserRole } from '../../src/users/user.entity';
import { JwtAuthGuard } from '../../src/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../src/auth/guards/roles.guard';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    findAll: jest.fn(),
    updateRole: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should return all users (admin only)', async () => {
    const result = [{ id: 1, email: 'admin@example.com', role: UserRole.ADMIN }];
    mockUsersService.findAll.mockResolvedValue(result);

    expect(await controller.findAll()).toEqual(result);
    expect(mockUsersService.findAll).toHaveBeenCalled();
  });

  it('should update user role (admin only)', async () => {
    const updatedUser = { id: 1, role: UserRole.EDITOR };
    mockUsersService.updateRole.mockResolvedValue(updatedUser);

    expect(await controller.updateRole(1, UserRole.EDITOR)).toEqual(updatedUser);
    expect(mockUsersService.updateRole).toHaveBeenCalledWith(1, UserRole.EDITOR);
  });

  it('should restrict to admin-only route', () => {
    expect(controller.doAdminStuff()).toEqual('Only admins can see this!');
  });
});
