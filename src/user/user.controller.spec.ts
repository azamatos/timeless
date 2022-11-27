import { Test } from '@nestjs/testing';

// project imports
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

// utils
import { getRandomLogin } from '../utils/randomGenerator';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  const login = getRandomLogin();
  const password = 'timeless2022';

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
      const user = await userController.register({
        login,
        password,
      });

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
      const result = await userController.login({ login, password });

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
      const result = await userController.updatePassword({
        login,
        password: 'Timeless2023',
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
