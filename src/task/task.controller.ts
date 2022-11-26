import {
  Req,
  Body,
  Controller,
  Post,
  Delete,
  Param,
  Get,
  Put,
} from '@nestjs/common';
import { CreateTask } from './dto/create-task';
import { UpdateTask } from './dto/update-task';
import { TaskService } from './task.service';
import { Request } from 'express';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  create(@Req() request: Request, @Body() createDto: CreateTask) {
    const { authorization } = request.headers;
    return this.taskService.create(authorization, createDto);
  }

  @Put('update')
  update(@Req() request: Request, @Body() updateDto: UpdateTask) {
    const { authorization } = request.headers;
    return this.taskService.update(authorization, updateDto.id, updateDto);
  }

  @Get(':id')
  getTask(@Req() request: Request, @Param('id') id: number) {
    const { authorization } = request.headers;
    return this.taskService.getTask(authorization, +id);
  }

  @Delete(':id')
  remove(@Req() request: Request, @Param('id') id: number) {
    const { authorization } = request.headers;
    return this.taskService.remove(authorization, +id);
  }
}
