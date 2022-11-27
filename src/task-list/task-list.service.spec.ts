import { Test, TestingModule } from '@nestjs/testing';

// project imports
import { PrismaService } from '../prisma/prisma.service';
import { TaskListService } from './task-list.service';
import { UserService } from '../user/user.service';

// utils
import { mockTaskList } from '../utils/mockData';

// types
import { TaskList } from '../types/graphql';

describe('TaskListService', () => {
  let service: TaskListService;
  let token: string;
  let taskList: TaskList;

  beforeAll(async () => {
    const newUser = {
      login: new Date().toLocaleTimeString() + 'taskListService',
      password: 'Sunshine',
    };

    const prisma = new PrismaService();
    const userService = new UserService(prisma);
    await userService.register(newUser);
    token = (await userService.login(newUser)).token;
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskListService, PrismaService],
    }).compile();

    service = module.get<TaskListService>(TaskListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create task list', () => {
    it('create and return task list with id', async () => {
      taskList = await service.create(token, mockTaskList);
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

  describe('update task list', () => {
    it('update and return task list with id', async () => {
      const updateTaskList = await service.update(token, taskList.id, {
        ...taskList,
        read: true,
      });
      expect(updateTaskList).toEqual(
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

  describe('get user task lists', () => {
    it('return user own task lists', async () => {
      const userLists = await service.getMyLists(token);
      expect(userLists).toContainEqual({
        id: taskList.id,
        name: taskList.name,
        tasks: [],
      });
    });
  });

  describe('get other task lists', () => {
    it('return user own task lists', async () => {
      const otherLists = await service.getOtherLists(token);
      expect(otherLists.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('get task list', () => {
    it('return exact task list by id', async () => {
      const foundTaskList = await service.getList(token, taskList.id);
      expect(foundTaskList).toEqual({
        id: taskList.id,
        name: taskList.name,
        tasks: [],
      });
    });
  });

  describe('get task list', () => {
    it('return exact task list by id', async () => {
      const removedTaskList = await service.remove(token, taskList.id);
      expect(removedTaskList).toEqual({
        id: taskList.id,
        name: taskList.name,
        tasks: [],
      });
    });
  });
});
