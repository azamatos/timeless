import { UserService } from './user.service';
import { Body, Controller, Post, Put } from '@nestjs/common';
import { UserData } from './dto/userData';

@Controller('/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() registerInput: UserData) {
    return this.userService.register(registerInput);
  }

  @Post('login')
  login(@Body() loginINput: UserData) {
    return this.userService.login(loginINput);
  }

  @Put('user/update')
  updatePassword(@Body() updateUserInput: UserData) {
    return this.userService.updatePassword(updateUserInput);
  }
}
