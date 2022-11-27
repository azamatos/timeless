import { Test, TestingModule } from '@nestjs/testing';

// project imports
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let newUserLogin: string;
  const login = new Date().toISOString() + 'service';
  const password = 'timeless2022';

  beforeAll(async () => {
    const prisma = new PrismaService();
    const user = new UserService(prisma);
    await user.register({ login, password });
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);

    newUserLogin = new Date().toLocaleString();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('register a user and return login', async () => {
      const registerFunc = await service.register({
        login: newUserLogin,
        password,
      });
      expect(registerFunc).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          login: expect.any(String),
        }),
      );
    });
  });

  describe('login', () => {
    it('login a user and return token', async () => {
      const loginFunc = await service.login({ login, password });

      expect(loginFunc).toEqual(
        expect.objectContaining({
          token: expect.any(String),
        }),
      );
    });
  });

  describe('update', () => {
    it('update password and return login', async () => {
      const updateFunc = await service.updatePassword({
        login,
        password: 'TimeLess',
      });

      expect(updateFunc).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          login: expect.any(String),
        }),
      );
    });
  });
});
