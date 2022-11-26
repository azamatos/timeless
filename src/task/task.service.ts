import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskListService } from '../task-list/task-list.service';
import { CreateTaskInput, Task, UpdateTaskInput } from '../types/graphql';
import { getToken } from '../utils/token';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private taskList: TaskListService,
  ) {}
  async create(token: string, createTaskInput: CreateTaskInput) {
    try {
      const taskList = await this.taskList.getList(
        token,
        createTaskInput.taskListId,
        'create',
      );

      if (taskList) {
        const task = await this.prisma.task.create({
          data: createTaskInput,
          select: {
            id: true,
            name: true,
            isCompleted: true,
            TaskList: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });

        return task;
      }
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Wrong input data');
    }

    throw new BadRequestException(
      'U have no rights to create task on this list',
    );
  }

  async getTask(token: string, taskId: number, action = 'read') {
    const user = getToken(token);

    try {
      const task: Task = await this.prisma.task.findFirst({
        where: {
          id: taskId,
          TaskList: {
            OR: [{ userId: user.id }, { [action]: true }],
          },
        },
        select: {
          id: true,
          name: true,
          isCompleted: true,
          TaskList: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return task;
    } catch (err) {
      throw new BadRequestException('Wrong input data');
    }
  }

  async update(token: string, id: number, updateTaskInput: UpdateTaskInput) {
    try {
      const task = await this.getTask(token, id, 'update');

      if (task) {
        return this.prisma.task.update({
          where: { id },
          data: updateTaskInput,
          select: {
            id: true,
            name: true,
            isCompleted: true,
            TaskList: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });
      }
    } catch (err) {
      throw new BadRequestException('Wrong input data');
    }

    throw new BadRequestException(
      'U have no rights to update task on this list',
    );
  }

  async remove(token: string, id: number) {
    const task: Task = await this.getTask(token, id, 'delete');
    try {
      if (task) {
        return this.prisma.task.delete({
          where: { id: task.id },
        });
      }
    } catch (err) {
      throw new BadRequestException('Wrong input data');
    }

    throw new BadRequestException(
      'U have no rights to delete task on this list',
    );
  }
}
