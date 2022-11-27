import { Test, TestingModule } from '@nestjs/testing';

// project imports
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';

// utils
import { getRandomLogin } from '../utils/randomGenerator';

describe('UserService', () => {
  let service: UserService;
  const login = getRandomLogin();
  const password = 'timeless2022';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('register a user and return login', async () => {
      const registerFunc = await service.register({
        login,
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
