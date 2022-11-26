import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TaskListController } from './task-List.controller';
import { TaskListService } from './task-List.service';
import { mockTaskList, mockTask, token } from '../utils/mockData';
import { Request } from 'express';

describe('TaskListController', () => {
  let taskListController: TaskListController;
  let taskListService: TaskListService;
  const req: Request = {} as Request;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TaskListController],
      providers: [TaskListService, PrismaService],
    }).compile();

    taskListController = moduleRef.get<TaskListController>(TaskListController);
    taskListService = moduleRef.get<TaskListService>(TaskListService);
    req.headers = {
      authorization: token,
    };
  });

  describe('create a task list', () => {
    it('should return task list data', async () => {
      const result = {
        id: 23,
        ...mockTaskList,
      };

      jest
        .spyOn(taskListService, 'create')
        .mockImplementation(() => Promise.resolve(result));

      expect(await taskListController.create(req, mockTaskList)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update and return task list', async () => {
      const result = {
        id: 23,
        ...mockTaskList,
      };
      jest
        .spyOn(taskListService, 'update')
        .mockImplementation(() => Promise.resolve(result));

      expect(
        await taskListController.update(req, { id: 23, ...mockTaskList }),
      ).toBe(result);
    });
  });

  describe('user lists', () => {
    it('should return user own lists of tasks', async () => {
      const result = [
        {
          id: 23,
          ...mockTaskList,
        },
        {
          id: 24,
          ...mockTaskList,
        },
      ];
      jest
        .spyOn(taskListService, 'getMyLists')
        .mockImplementation(() => Promise.resolve(result));

      expect(await taskListController.getMyLists(req)).toBe(result);
    });
  });

  describe(`other user's lists`, () => {
    it(`should return other user's lists of tasks`, async () => {
      const result = [
        {
          id: 23,
          ...mockTaskList,
        },
        {
          id: 24,
          ...mockTaskList,
        },
      ];
      jest
        .spyOn(taskListService, 'getOtherLists')
        .mockImplementation(() => Promise.resolve(result));

      expect(await taskListController.getOtherLists(req)).toBe(result);
    });
  });

  describe('get task list by id', () => {
    it('should return task list by id', async () => {
      const result = {
        id: 23,
        ...mockTaskList,
      };
      jest
        .spyOn(taskListService, 'getList')
        .mockImplementation(() => Promise.resolve(result));

      expect(await taskListController.getList(req, 23)).toBe(result);
    });
  });

  describe('remove task list by id', () => {
    it('should return task list by id', async () => {
      const result = {
        name: mockTaskList.name,
        tasks: [mockTask],
        id: 23,
      };
      jest
        .spyOn(taskListService, 'remove')
        .mockImplementation(() => Promise.resolve(result));

      expect(await taskListController.deleteList(req, 23)).toBe(result);
    });
  });
});
