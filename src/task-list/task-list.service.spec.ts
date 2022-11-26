import { Test, TestingModule } from '@nestjs/testing';
import { mockTaskList, token } from '../utils/mockData';
import { PrismaService } from '../prisma/prisma.service';
import { TaskListService } from './task-list.service';

describe('TaskListService', () => {
  let service: TaskListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskListService, PrismaService],
    }).compile();

    service = module.get<TaskListService>(TaskListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('create task list', () => {
  //   it('create and return task list with id', async () => {
  //     const createFunc = await service.create(token, mockTaskList);
  //     expect(createFunc).toEqual(
  //       expect.objectContaining({
  //         id: expect.any(Number),
  //         name: expect.any(String),
  //         create: expect.any(Boolean),
  //         read: expect.any(Boolean),
  //         update: expect.any(Boolean),
  //         delete: expect.any(Boolean),
  //       }),
  //     );
  //   });
  // });

  // describe('update task list', () => {
  //   it('update and return task list with id', async () => {
  //     const updateFunc = await service.update(token, 12, {
  //       id: 12,
  //       ...mockTaskList,
  //     });
  //     expect(updateFunc).toEqual({
  //       id: 12,
  //       ...mockTaskList,
  //     });
  //   });
  // });

  describe('get user task lists', () => {
    it('return user own task lists', async () => {
      const getOwnListsFunc = await service.getMyLists(token);
      expect(getOwnListsFunc).toContainEqual({
        id: 10,
        name: mockTaskList.name,
        tasks: [],
      });
    });
  });

  describe('get user task lists', () => {
    it('return user own task lists', async () => {
      const getOtherListsFunc = await service.getOtherLists(token);
      expect(getOtherListsFunc).toContainEqual({
        id: 3,
        name: 'Google',
        tasks: [
          { id: 4, isCompleted: false, name: 'REVMOE AGAING', taskListId: 3 },
          {
            id: 5,
            isCompleted: false,
            name: 'Craete from another user',
            taskListId: 3,
          },
        ],
      });
    });
  });

  describe('get task list', () => {
    it('return exact task list by id', async () => {
      const getTaskListFunc = await service.getList(token, 3);
      expect(getTaskListFunc).toEqual({
        id: 3,
        name: 'Google',
        tasks: [
          { id: 4, isCompleted: false, name: 'REVMOE AGAING', taskListId: 3 },
          {
            id: 5,
            isCompleted: false,
            name: 'Craete from another user',
            taskListId: 3,
          },
        ],
      });
    });
  });

  // describe('get task list', () => {
  //   it('return exact task list by id', async () => {
  //     const removeFunc = await service.remove(token, 14);
  //     expect(removeFunc).toEqual({
  //       id: 14,
  //       name: mockTaskList.name,
  //       tasks: [],
  //     });
  //   });
  // });
});
