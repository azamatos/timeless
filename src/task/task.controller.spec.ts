import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { mockTaskList, mockTask, token } from '../utils/mockData';
import { Request } from 'express';
import { TaskListService } from '../task-list/task-list.service';

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;
  const req: Request = {} as Request;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService, PrismaService, TaskListService],
    }).compile();

    taskController = moduleRef.get<TaskController>(TaskController);
    taskService = moduleRef.get<TaskService>(TaskService);

    req.headers = {
      authorization: token,
    };
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

      expect(await taskController.create(req, mockTask)).toBe(result);
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

      expect(await taskController.update(req, { id: 10, ...mockTask })).toBe(
        result,
      );
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

      expect(await taskController.getTask(req, 20)).toBe(result);
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

      expect(await taskController.remove(req, 23)).toBe(result);
    });
  });
});
