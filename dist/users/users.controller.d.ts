import { UsersService } from './users.service';
import { UserRole } from './user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./user.entity").User[]>;
    updateRole(id: number, role: UserRole): Promise<import("./user.entity").User | null>;
    doAdminStuff(): string;
}
