import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { mockUser } from '../utils/mockData';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
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

      expect(await userController.register(mockUser)).toBe(result);
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

      expect(await userController.login(mockUser)).toBe(result);
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

      expect(await userController.updatePassword(mockUser)).toStrictEqual(
        result,
      );
    });
  });
});
