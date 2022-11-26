import { Module } from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { TaskListResolver } from './task-list.resolver';
import { TaskListController } from './task-list.controller';

@Module({
  providers: [TaskListResolver, TaskListService],
  controllers: [TaskListController],
})
export class TaskListModule {}
