import { Module } from '@nestjs/common';

// third party
import { TaskListController } from './task-list.controller';
import { TaskListResolver } from './task-list.resolver';
import { TaskListService } from './task-list.service';

@Module({
  providers: [TaskListResolver, TaskListService],
  controllers: [TaskListController],
})
export class TaskListModule {}
