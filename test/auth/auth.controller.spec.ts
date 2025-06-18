import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../../src/auth/auth.module';
import { UsersModule } from '../../src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../src/users/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userRepo: Repository<User>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userRepo = moduleFixture.get<Repository<User>>(getRepositoryToken(User));
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/register (POST)', () => {
    it('should register a new user and return an access token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'test@example.com', password: 'password123' })
        .expect(201);

      expect(response.body).toHaveProperty('access_token');
    });

    it('should not allow duplicate registration', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'duplicate@example.com', password: 'pass' });

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'duplicate@example.com', password: 'pass' })
        .expect(500); // can be changed to 400 or 409 if custom validation is added

      expect(response.body.message).toContain('duplicate');
    });
  });

  describe('/auth/login (POST)', () => {
    beforeAll(async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'login@example.com', password: 'password123' });
    });

    it('should login and return access token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'login@example.com', password: 'password123' })
        .expect(201);

      expect(response.body).toHaveProperty('access_token');
    });

    it('should fail login with wrong credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'login@example.com', password: 'wrongpass' })
        .expect(401);

      expect(response.body.message).toContain('Unauthorized');
    });
  });
});
