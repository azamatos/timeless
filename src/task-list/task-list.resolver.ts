import { Request } from 'express';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';

// project imports
import { TaskListService } from './task-list.service';

// types
import { CreateTaskListInput, UpdateTaskListInput } from '../types/graphql';

@Resolver('TaskList')
export class TaskListResolver {
  constructor(private readonly taskListService: TaskListService) {}

  @Mutation('createTaskList')
  create(
    @Context('req') req: Request,
    @Args('createTaskListInput') createTaskListInput: CreateTaskListInput,
  ) {
    const { authorization } = req.headers;
    return this.taskListService.create(authorization, createTaskListInput);
  }

  @Query('myLists')
  findMyLists(@Context('req') req: Request) {
    const { authorization } = req.headers;
    return this.taskListService.getMyLists(authorization);
  }

  @Query('otherLists')
  findOtherLists(@Context('req') req: Request) {
    const { authorization } = req.headers;
    return this.taskListService.getOtherLists(authorization);
  }

  @Query('findList')
  findList(@Context('req') req: Request, @Args('id') id: number) {
    const { authorization } = req.headers;
    return this.taskListService.getList(authorization, id);
  }

  @Mutation('updateTaskList')
  update(
    @Context('req') req: Request,
    @Args('updateTaskListInput') updateTaskListInput: UpdateTaskListInput,
  ) {
    const { authorization } = req.headers;

    return this.taskListService.update(
      authorization,
      updateTaskListInput.id,
      updateTaskListInput,
    );
  }

  @Mutation('removeTaskList')
  remove(@Context('req') req: Request, @Args('id') id: number) {
    const { authorization } = req.headers;

    return this.taskListService.remove(authorization, id);
  }
}
