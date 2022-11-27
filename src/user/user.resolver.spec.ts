import { Test, TestingModule } from '@nestjs/testing';

// projec imports
import { PrismaService } from '../prisma/prisma.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

// utils
import { getRandomLogin } from '../utils/randomGenerator';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: UserService;
  const login = getRandomLogin();
  const password = 'timeless2022';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService, PrismaService],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('registering a user', () => {
    it('should return user unique login', async () => {
      const user = await resolver.register({ login, password });

      jest
        .spyOn(userService, 'register')
        .mockImplementation(() => Promise.resolve(user));

      expect(user).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          login: expect.any(String),
        }),
      );
    });
  });

  describe('logging in', () => {
    it('should return user token', async () => {
      const result = await resolver.login({ login, password });

      jest
        .spyOn(userService, 'login')
        .mockImplementation(() => Promise.resolve(result));

      expect(result).toEqual(
        expect.objectContaining({
          token: expect.any(String),
        }),
      );
    });
  });

  describe('updating user data', () => {
    it('should return user id and login', async () => {
      const result = await resolver.updatePassword({
        login,
        password: 'WithTime',
      });
      jest
        .spyOn(userService, 'register')
        .mockImplementation(() => Promise.resolve(result));

      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          login: expect.any(String),
        }),
      );
    });
  });
});
