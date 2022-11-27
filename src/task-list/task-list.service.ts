import { BadRequestException, Injectable } from '@nestjs/common';

// project imports
import { PrismaService } from '../prisma/prisma.service';

// utils
import { getToken } from '../utils/token';

// types
import {
  CreateTaskListInput,
  TaskList,
  UpdateTaskListInput,
} from 'src/types/graphql';

@Injectable()
export class TaskListService {
  constructor(private prisma: PrismaService) {}
  async create(token: string, { name }: CreateTaskListInput) {
    const user = getToken(token);

    try {
      const taskList = await this.prisma.taskList.create({
        data: {
          userId: user.id,
          name,
        },
        select: {
          id: true,
          name: true,
          create: true,
          read: true,
          update: true,
          delete: true,
        },
      });

      return taskList;
    } catch (err) {
      throw new BadRequestException('Wrong input data');
    }
  }

  async getMyLists(token: string) {
    const user = getToken(token);

    try {
      const myLists = await this.prisma.taskList.findMany({
        where: { userId: user.id },
        select: { id: true, name: true, tasks: true },
      });

      return myLists.length > 0 ? myLists : ([] as TaskList[]);
    } catch (err) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async getOtherLists(token: string) {
    const user = getToken(token);

    try {
      const otherLists = await this.prisma.taskList.findMany({
        where: { read: true, NOT: { userId: user.id } },
        select: { id: true, name: true, tasks: true },
      });

      return otherLists.length > 0 ? otherLists : ([] as TaskList[]);
    } catch (err) {
      throw new BadRequestException('Wrong input data');
    }
  }

  async getList(token: string, id: number, action = 'read') {
    const user = getToken(token);

    try {
      const taskList = await this.prisma.taskList.findFirst({
        where: {
          id,
          OR: [{ userId: user.id }, { [action]: true }],
        },
        select: { id: true, name: true, tasks: true },
      });

      if (!taskList) {
        throw new BadRequestException(
          'You dont have rights or such task list doesnt exist',
        );
      }
      return taskList;
    } catch (err) {
      throw new BadRequestException('Please check ur input data and rights');
    }
  }

  async update(
    token: string,
    id: number,
    updateTaskListInput: UpdateTaskListInput,
  ) {
    try {
      const taskList = await this.findList(token, id);

      if (taskList) {
        const newTaskList = await this.prisma.taskList.update({
          where: { id },
          data: updateTaskListInput,
          select: {
            id: true,
            name: true,
            create: true,
            read: true,
            update: true,
            delete: true,
          },
        });

        return newTaskList;
      }
    } catch (err) {
      throw new BadRequestException('Something went wrong');
    }

    throw new BadRequestException('Please check ur input data');
  }

  async remove(token: string, id: number) {
    try {
      const taskList = await this.findList(token, id);

      if (taskList) {
        const removedTaskList = await this.prisma.taskList.delete({
          where: { id },
          select: { id: true, name: true, tasks: true },
        });

        return removedTaskList;
      }
    } catch (err) {
      throw new BadRequestException('Something went wrong');
    }

    throw new BadRequestException('U have no rights to delete this task list');
  }

  async findList(token: string, id: number) {
    const user = getToken(token);
    try {
      return await this.prisma.taskList.findFirst({
        where: {
          id,
          userId: user.id,
        },
      });
    } catch (err) {
      throw new BadRequestException('U have no rights for this task list');
    }
  }
}
