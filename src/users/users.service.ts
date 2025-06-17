import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(userData: Partial<User>) {
    const { email, password, role } = userData;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = new User();
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    user.role = role || UserRole.VIEWER;

    return this.usersRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async updateRole(id: number, role: UserRole) {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (user) {
      user.role = role;
      return this.usersRepo.save(user);
    }
    return null;
  }
}
