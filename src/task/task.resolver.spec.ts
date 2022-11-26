import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { Request } from 'express';
import { token, mockTask, mockTaskList } from '../utils/mockData';
import { TaskListService } from '../task-list/task-list.service';

describe('TaskResolver', () => {
  let resolver: TaskResolver;
  let taskService: TaskService;

  const req: Request = {} as Request;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskResolver, TaskService, TaskListService, PrismaService],
    }).compile();

    resolver = module.get<TaskResolver>(TaskResolver);
    taskService = module.get<TaskService>(TaskService);

    req.headers = {
      authorization: token,
    };
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('create a task ', () => {
    it('should return task data', async () => {
      const result = {
        ...mockTask,
        TaskList: {
          id: 20,
          name: mockTaskList.name,
        },
      };

      jest
        .spyOn(taskService, 'create')
        .mockImplementation(() => Promise.resolve(result));

      expect(await resolver.create(req, mockTask)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update and return task ', async () => {
      const result = {
        ...mockTask,
        TaskList: {
          id: 20,
          name: mockTaskList.name,
        },
      };
      jest
        .spyOn(taskService, 'update')
        .mockImplementation(() => Promise.resolve(result));

      expect(await resolver.update(req, { id: 10, ...mockTask })).toBe(result);
    });
  });

  describe('get task by id', () => {
    it('should return task  by id', async () => {
      const result = {
        id: 23,
        ...mockTask,
      };
      jest
        .spyOn(taskService, 'getTask')
        .mockImplementation(() => Promise.resolve(result));

      expect(await resolver.findOne(req, 20)).toBe(result);
    });
  });

  describe('remove task by id', () => {
    it('should return task  by id', async () => {
      const result = {
        id: 23,
        ...mockTask,
      };
      jest
        .spyOn(taskService, 'remove')
        .mockImplementation(() => Promise.resolve(result));

      expect(await resolver.remove(req, 23)).toBe(result);
    });
  });
});
