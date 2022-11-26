import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from './user.service';
import { mockUser } from '../utils/mockData';

describe('UserService', () => {
  let service: UserService;
  let login: string;
  let password: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);

    login = new Date().toLocaleString();
    password = 'timeless2022';
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('register', () => {
  //   it('register a user and return login', async () => {
  //     const registerFunc = await service.register({
  //       login,
  //       password,
  //     });
  //     expect(registerFunc).toEqual({ login });
  //   });
  // });

  describe('login', () => {
    it('login a user and return token', async () => {
      const loginFunc = await service.login(mockUser);

      expect(loginFunc).toEqual(
        expect.objectContaining({
          token: expect.any(String),
        }),
      );
    });
  });

  describe('update', () => {
    it('update password and return login', async () => {
      const updateFunc = await service.updatePassword(mockUser);

      expect(updateFunc).toEqual({ id: 73, login: mockUser.login });
    });
  });
});
