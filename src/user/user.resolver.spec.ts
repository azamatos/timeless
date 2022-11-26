import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { mockUser } from '../utils/mockData';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: UserService;

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
      const result = {
        id: 23,
        login: mockUser.login,
      };
      jest
        .spyOn(userService, 'register')
        .mockImplementation(() => Promise.resolve(result));

      expect(await resolver.register(mockUser)).toBe(result);
    });
  });

  describe('logging in', () => {
    it('should return user token', async () => {
      const result = {
        token: 'token',
      };
      jest
        .spyOn(userService, 'login')
        .mockImplementation(() => Promise.resolve(result));

      expect(await resolver.login(mockUser)).toBe(result);
    });
  });

  describe('updating user data', () => {
    it('should return user id and login', async () => {
      const result = {
        id: 73,
        login: mockUser.login,
      };
      jest
        .spyOn(userService, 'register')
        .mockImplementation(() => Promise.resolve(result));

      expect(await resolver.updatePassword(mockUser)).toStrictEqual(result);
    });
  });
});
