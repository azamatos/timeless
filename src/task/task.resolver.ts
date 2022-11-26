import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Request } from 'express';
import { CreateTaskInput, UpdateTaskInput } from '../types/graphql';
import { TaskService } from './task.service';

@Resolver('Task')
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation('createTask')
  create(
    @Context('req') req: Request,
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ) {
    const { authorization } = req.headers;
    return this.taskService.create(authorization, createTaskInput);
  }

  // @Query('getListTasks')
  // getTasksByList(@Args('id') id: number) {
  //   return this.taskService.findTasksByList(id);
  // }

  @Query('getTask')
  findOne(@Context('req') req: Request, @Args('id') id: number) {
    const { authorization } = req.headers;
    return this.taskService.getTask(authorization, id);
  }

  @Mutation('updateTask')
  update(
    @Context('req') req: Request,
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ) {
    const { authorization } = req.headers;
    return this.taskService.update(
      authorization,
      updateTaskInput.id,
      updateTaskInput,
    );
  }

  @Mutation('removeTask')
  remove(@Context('req') req: Request, @Args('id') id: number) {
    const { authorization } = req.headers;
    return this.taskService.remove(authorization, id);
  }
}
