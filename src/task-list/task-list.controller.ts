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
import { CreateTaskList } from './dto/create-task-list';
import { TaskListService } from './task-list.service';
import { Request } from 'express';
import { UpdateTaskList } from './dto/update-task-list';

@Controller('task-list')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Post('create')
  create(@Req() request: Request, @Body() createDto: CreateTaskList) {
    const { authorization } = request.headers;
    return this.taskListService.create(authorization, createDto);
  }

  @Put('update')
  update(@Req() request: Request, @Body() updateDto: UpdateTaskList) {
    const { authorization } = request.headers;
    return this.taskListService.update(authorization, updateDto.id, updateDto);
  }

  @Get('mine')
  getMyLists(@Req() request: Request) {
    const { authorization } = request.headers;
    return this.taskListService.getMyLists(authorization);
  }

  @Get('other')
  getOtherLists(@Req() request: Request) {
    const { authorization } = request.headers;
    return this.taskListService.getOtherLists(authorization);
  }

  @Get(':id')
  getList(@Req() request: Request, @Param('id') id: number) {
    const { authorization } = request.headers;
    return this.taskListService.getList(authorization, +id);
  }

  @Delete(':id')
  deleteList(@Req() request: Request, @Param('id') id: number) {
    const { authorization } = request.headers;
    return this.taskListService.remove(authorization, +id);
  }
}
