import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TaskListResolver } from './task-list.resolver';
import { TaskListService } from './task-List.service';
import { mockTaskList, mockTask, token } from '../utils/mockData';
import { Request } from 'express';

describe('TaskListResolver', () => {
  let resolver: TaskListResolver;
  let taskListService: TaskListService;
  const req: Request = {} as Request;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TaskListService, TaskListResolver, PrismaService],
    }).compile();

    resolver = moduleRef.get<TaskListResolver>(TaskListResolver);
    taskListService = moduleRef.get<TaskListService>(TaskListService);
    req.headers = {
      authorization: token,
    };
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
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

      expect(await resolver.create(req, mockTaskList)).toBe(result);
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

      expect(await resolver.update(req, { id: 23, ...mockTaskList })).toBe(
        result,
      );
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

      expect(await resolver.findMyLists(req)).toBe(result);
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

      expect(await resolver.findOtherLists(req)).toBe(result);
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

      expect(await resolver.findList(req, 23)).toBe(result);
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

      expect(await resolver.remove(req, 23)).toBe(result);
    });
  });
});
