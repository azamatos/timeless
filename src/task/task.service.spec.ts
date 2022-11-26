import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskListService } from '../task-list/task-list.service';
import { mockTask, token } from '../utils/mockData';
import { PrismaService } from '../prisma/prisma.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService, TaskListService, PrismaService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('create task', () => {
  //   it('create and return task with id', async () => {
  //     const createFunc = await service.create(token, {
  //       name: mockTask.name,
  //       taskListId: mockTask.taskListId,
  //     });
  //     expect(createFunc).toEqual(
  //       expect.objectContaining({
  //         id: expect.any(Number),
  //         name: expect.any(String),
  //         isCompleted: expect.any(Boolean),
  //         TaskList: expect.any(Object),
  //       }),
  //     );
  //   });
  // });

  describe('update task', () => {
    it('update and return task with id', async () => {
      const updateFunc = await service.update(token, 10, mockTask);
      expect(updateFunc).toEqual({
        id: 10,
        isCompleted: false,
        name: 'Wash the dishes',
        TaskList: {
          id: 23,
          name: 'Home Duty',
        },
      });
    });
  });

  describe('get task', () => {
    it('return exact task by id', async () => {
      const getTaskFunc = await service.getTask(token, 4);
      expect(getTaskFunc).toEqual({
        id: 4,
        isCompleted: false,
        name: 'REVMOE AGAING',
        TaskList: { id: 3, name: 'Google' },
      });
    });
  });

  // describe('remove task by id', () => {
  //   it('return exact task by id', async () => {
  //     const removeFunc = await service.remove(token, 14);
  //     expect(removeFunc).toEqual({
  //       id: 14,
  //       isCompleted: false,
  //       name: 'Wash the dishes',
  //       taskListId: 23,
  //     });
  //   });
  // });
});
