import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { TaskController } from './task.controller';
import { TaskListService } from 'src/task-list/task-list.service';

@Module({
  providers: [TaskResolver, TaskService, TaskListService],
  controllers: [TaskController],
})
export class TaskModule {}
