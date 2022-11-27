import {
  Body,
  Controller,
  Post,
  Put,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';

// swagger
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

// project imports
import { UserService } from './user.service';

// utils
import {
  registerSchema,
  loginSchema,
  updateSchema,
} from '../utils/swaggerData';

// types
import { UserData } from './dto/userData';

@Controller('/')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a user' })
  @ApiBody({
    schema: registerSchema.schema,
  })
  @ApiResponse(registerSchema)
  @UsePipes(ValidationPipe)
  register(@Body() registerInput: UserData) {
    return this.userService.register(registerInput);
  }

  @Post('login')
  @ApiOperation({ summary: 'Logging in user' })
  @ApiBody({
    schema: registerSchema.schema,
  })
  @ApiResponse(loginSchema)
  @UsePipes(ValidationPipe)
  login(@Body() loginINput: UserData) {
    return this.userService.login(loginINput);
  }

  @Put('user/update')
  @ApiOperation({ summary: 'Updating user password' })
  @ApiBody({
    schema: updateSchema.schema,
  })
  @ApiResponse(updateSchema)
  @UsePipes(ValidationPipe)
  updatePassword(@Body() updateUserInput: UserData) {
    return this.userService.updatePassword(updateUserInput);
  }
}
