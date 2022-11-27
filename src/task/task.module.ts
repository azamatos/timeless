import { Module } from '@nestjs/common';

// third party
import { TaskListService } from 'src/task-list/task-list.service';
import { TaskController } from './task.controller';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

@Module({
  providers: [TaskResolver, TaskService, TaskListService],
  controllers: [TaskController],
})
export class TaskModule {}
