import { Request } from 'express';
import {
  Req,
  Body,
  Controller,
  Post,
  Delete,
  Param,
  Get,
  Put,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';

// swagger
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

// project imports
import { TaskListService } from './task-list.service';

// utils
import {
  taskListSchema,
  taskListBody,
  taskListsSchema,
  paramSchema,
} from '../utils/swaggerData';

// types
import { CreateTaskList } from './dto/create-task-list';
import { UpdateTaskList } from './dto/update-task-list';

@Controller('task-list')
@ApiTags('Task list')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Post('create')
  @ApiOperation({ summary: 'Craete a task list' })
  @ApiBody(taskListBody)
  @ApiBearerAuth('access-token')
  @ApiResponse(taskListSchema)
  @UsePipes(ValidationPipe)
  create(@Req() request: Request, @Body() createDto: CreateTaskList) {
    const { authorization } = request.headers;
    return this.taskListService.create(authorization, createDto);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update a task list' })
  @ApiBody(taskListBody)
  @ApiBearerAuth('access-token')
  @ApiResponse(taskListSchema)
  @UsePipes(ValidationPipe)
  update(@Req() request: Request, @Body() updateDto: UpdateTaskList) {
    const { authorization } = request.headers;
    return this.taskListService.update(authorization, updateDto.id, updateDto);
  }

  @Get('mine')
  @ApiOperation({ summary: 'Return user task lists' })
  @ApiBearerAuth('access-token')
  @ApiResponse(taskListsSchema)
  @UsePipes(ValidationPipe)
  getMyLists(@Req() request: Request) {
    const { authorization } = request.headers;
    return this.taskListService.getMyLists(authorization);
  }

  @Get('other')
  @ApiOperation({ summary: 'Return others task lists' })
  @ApiBearerAuth('access-token')
  @ApiResponse(taskListsSchema)
  @UsePipes(ValidationPipe)
  getOtherLists(@Req() request: Request) {
    const { authorization } = request.headers;
    return this.taskListService.getOtherLists(authorization);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return a task list by id' })
  @ApiParam(paramSchema)
  @ApiBearerAuth('access-token')
  @ApiResponse(taskListSchema)
  @UsePipes(ValidationPipe)
  getList(@Req() request: Request, @Param('id') id: number) {
    const { authorization } = request.headers;
    return this.taskListService.getList(authorization, +id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a task list by id' })
  @ApiParam(paramSchema)
  @ApiBearerAuth('access-token')
  @ApiResponse(taskListSchema)
  @UsePipes(ValidationPipe)
  deleteList(@Req() request: Request, @Param('id') id: number) {
    const { authorization } = request.headers;
    return this.taskListService.remove(authorization, +id);
  }
}
