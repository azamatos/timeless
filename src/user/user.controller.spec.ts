import { Test } from '@nestjs/testing';

// project imports
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let newUserLogin: string;
  const login = new Date().toISOString();
  const password = 'timeless2022';

  beforeAll(async () => {
    const prisma = new PrismaService();
    const user = new UserService(prisma);
    await user.register({ login, password });
  });

  beforeAll(() => {
    newUserLogin = new Date().toLocaleString() + 'controller';
  });

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
        login: newUserLogin,
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
