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
import { TaskService } from './task.service';

// utils
import {
  createTaskBody,
  updateTaskBody,
  taskResponse,
  paramSchema,
} from '../utils/swaggerData';

// types
import { CreateTask } from './dto/create-task';
import { UpdateTask } from './dto/update-task';

@Controller('task')
@ApiTags('Task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a task' })
  @ApiBody(createTaskBody)
  @ApiBearerAuth('access-token')
  @ApiResponse(taskResponse('Creates and returns task'))
  @UsePipes(ValidationPipe)
  create(@Req() request: Request, @Body() createDto: CreateTask) {
    const { authorization } = request.headers;
    return this.taskService.create(authorization, createDto);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update a task' })
  @ApiBody(updateTaskBody)
  @ApiBearerAuth('access-token')
  @ApiResponse(taskResponse('Updates and returns task'))
  @UsePipes(ValidationPipe)
  update(@Req() request: Request, @Body() updateDto: UpdateTask) {
    const { authorization } = request.headers;
    return this.taskService.update(authorization, updateDto.id, updateDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiParam(paramSchema)
  @ApiBearerAuth('access-token')
  @ApiResponse(taskResponse('Find task by id and returns it'))
  @UsePipes(ValidationPipe)
  getTask(@Req() request: Request, @Param('id') id: number) {
    const { authorization } = request.headers;
    return this.taskService.getTask(authorization, +id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a task by id' })
  @ApiParam(paramSchema)
  @ApiBearerAuth('access-token')
  @ApiResponse(taskResponse('Removes task by id and returns it'))
  @UsePipes(ValidationPipe)
  remove(@Req() request: Request, @Param('id') id: number) {
    const { authorization } = request.headers;
    return this.taskService.remove(authorization, +id);
  }
}
