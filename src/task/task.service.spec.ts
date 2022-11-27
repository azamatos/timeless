import { Test, TestingModule } from '@nestjs/testing';

// project imports
import { TaskListService } from '../task-list/task-list.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { TaskService } from './task.service';

// utils
import { mockTask, mockTaskList } from '../utils/mockData';
import { getRandomLogin } from '../utils/randomGenerator';

// types
import { Task, TaskList } from '../types/graphql';

describe('TaskService', () => {
  let service: TaskService;
  let newTask: Task;
  let token: string;
  let taskList: TaskList;

  beforeAll(async () => {
    const newUser = {
      login: getRandomLogin(),
      password: 'New Year',
    };

    const prisma = new PrismaService();
    const userService = new UserService(prisma);
    const taskListService = new TaskListService(prisma);

    await userService.register(newUser);
    token = (await userService.login(newUser)).token;

    taskList = await taskListService.create(token, {
      ...mockTaskList,
      name: newUser.login,
    });
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService, TaskListService, PrismaService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create task', () => {
    it('create and return task with id', async () => {
      newTask = await service.create(token, {
        name: mockTask.name,
        taskListId: taskList.id,
      });
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

  describe('update task', () => {
    it('update and return task with id', async () => {
      const updatedTask = await service.update(token, newTask.id, {
        id: newTask.id,
        name: newTask.name,
        isCompleted: true,
      });
      expect(updatedTask).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          isCompleted: expect.any(Boolean),
          TaskList: expect.any(Object),
        }),
      );
    });
  });

  describe('get task', () => {
    it('return exact task by id', async () => {
      const task = await service.getTask(token, newTask.id);
      expect(task).toEqual(
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
    it('return exact task by id', async () => {
      const task = await service.remove(token, newTask.id);
      expect(task).toEqual(
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
