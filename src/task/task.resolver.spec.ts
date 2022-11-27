import { Request } from 'express';
import { Test, TestingModule } from '@nestjs/testing';

// third party
import { TaskListService } from '../task-list/task-list.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

// utils
import { mockTask, mockTaskList } from '../utils/mockData';
import { getRandomLogin } from '../utils/randomGenerator';

// types
import { Task, TaskList } from 'src/types/graphql';

describe('TaskResolver', () => {
  let resolver: TaskResolver;
  let taskService: TaskService;
  let taskList: TaskList;
  let newTask: Task;

  const req: Request = {} as Request;

  beforeAll(async () => {
    const newUser = {
      login: getRandomLogin(),
      password: 'New Year',
    };

    const prisma = new PrismaService();
    const userService = new UserService(prisma);
    const taskListService = new TaskListService(prisma);

    await userService.register(newUser);
    const { token } = await userService.login(newUser);

    req.headers = {
      authorization: token,
    };

    taskList = await taskListService.create(token, {
      ...mockTaskList,
      name: newUser.login,
    });
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskResolver, TaskService, TaskListService, PrismaService],
    }).compile();

    resolver = module.get<TaskResolver>(TaskResolver);
    taskService = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('create a task ', () => {
    it('should return task data', async () => {
      newTask = await resolver.create(req, {
        name: mockTask.name,
        taskListId: taskList.id,
      });

      jest
        .spyOn(taskService, 'create')
        .mockImplementation(() => Promise.resolve(newTask));

      expect(newTask).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          isCompleted: expect.any(Boolean),
          TaskList: expect.any(Object),
        }),
      );
    });
  });

  describe('update', () => {
    it('should update and return task ', async () => {
      const result = await resolver.update(req, {
        id: newTask.id,
        name: newTask.name,
        isCompleted: true,
      });

      jest
        .spyOn(taskService, 'update')
        .mockImplementation(() => Promise.resolve(result));

      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          isCompleted: expect.any(Boolean),
          TaskList: expect.any(Object),
        }),
      );
    });
  });

  describe('get task by id', () => {
    it('should return task  by id', async () => {
      const result = await resolver.findOne(req, newTask.id);
      jest
        .spyOn(taskService, 'getTask')
        .mockImplementation(() => Promise.resolve(result));

      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          isCompleted: expect.any(Boolean),
          TaskList: expect.any(Object),
        }),
      );
    });
  });

  describe('remove task by id', () => {
    it('should return task  by id', async () => {
      const result = await resolver.remove(req, newTask.id);
      jest
        .spyOn(taskService, 'remove')
        .mockImplementation(() => Promise.resolve(result));

      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          isCompleted: expect.any(Boolean),
          TaskList: expect.any(Object),
        }),
      );
    });
  });
});
