import { Request } from 'express';
import { Test } from '@nestjs/testing';

// project imports
import { TaskListController } from './task-List.controller';
import { PrismaService } from '../prisma/prisma.service';
import { TaskListService } from './task-List.service';
import { UserService } from '../user/user.service';

// utils
import { getRandomLogin } from '../utils/randomGenerator';
import { mockTaskList } from '../utils/mockData';

// types
import { MutationTaskList } from 'src/types/graphql';

describe('TaskListController', () => {
  let taskListController: TaskListController;
  let taskListService: TaskListService;
  let taskList: MutationTaskList;

  const req: Request = {} as Request;

  beforeAll(async () => {
    const newUser = {
      login: getRandomLogin(),
      password: 'Sunshine',
    };

    const prisma = new PrismaService();
    const userService = new UserService(prisma);
    await userService.register(newUser);
    const { token } = await userService.login(newUser);

    req.headers = {
      authorization: token,
    };
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TaskListController],
      providers: [TaskListService, PrismaService],
    }).compile();

    taskListController = moduleRef.get<TaskListController>(TaskListController);
    taskListService = moduleRef.get<TaskListService>(TaskListService);
  });

  describe('create a task list', () => {
    it('should return task list data', async () => {
      taskList = await taskListController.create(req, mockTaskList);

      jest
        .spyOn(taskListService, 'create')
        .mockImplementation(() => Promise.resolve(taskList));

      expect(taskList).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          create: expect.any(Boolean),
          read: expect.any(Boolean),
          update: expect.any(Boolean),
          delete: expect.any(Boolean),
        }),
      );
    });
  });

  describe('update', () => {
    it('should update and return task list', async () => {
      const result = await taskListController.update(req, taskList);
      jest
        .spyOn(taskListService, 'update')
        .mockImplementation(() => Promise.resolve(result));

      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          create: expect.any(Boolean),
          read: expect.any(Boolean),
          update: expect.any(Boolean),
          delete: expect.any(Boolean),
        }),
      );
    });
  });

  describe('user lists', () => {
    it('should return user own lists of tasks', async () => {
      const result = await taskListController.getMyLists(req);
      jest
        .spyOn(taskListService, 'getMyLists')
        .mockImplementation(() => Promise.resolve(result));

      expect(result).toContainEqual({
        id: taskList.id,
        name: taskList.name,
        tasks: [],
      });
    });
  });

  describe(`other user's lists`, () => {
    it(`should return other user's lists of tasks`, async () => {
      const result = await taskListController.getOtherLists(req);
      jest
        .spyOn(taskListService, 'getOtherLists')
        .mockImplementation(() => Promise.resolve(result));

      expect(result.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('get task list by id', () => {
    it('should return task list by id', async () => {
      const result = await taskListController.getList(req, taskList.id);
      jest
        .spyOn(taskListService, 'getList')
        .mockImplementation(() => Promise.resolve(result));

      expect(result).toEqual({
        id: taskList.id,
        name: taskList.name,
        tasks: [],
      });
    });
  });

  describe('remove task list by id', () => {
    it('should return task list by id', async () => {
      const result = await taskListController.deleteList(req, taskList.id);
      jest
        .spyOn(taskListService, 'remove')
        .mockImplementation(() => Promise.resolve(result));

      expect(result).toEqual({
        id: taskList.id,
        name: taskList.name,
        tasks: [],
      });
    });
  });
});
