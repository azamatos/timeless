import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserInput } from '../types/graphql';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('register')
  register(@Args('registerInput') registerInput: UserInput) {
    return this.userService.register(registerInput);
  }

  @Query('login')
  login(@Args('loginInput') loginINput: UserInput) {
    return this.userService.login(loginINput);
  }

  @Mutation('updatePassword')
  updatePassword(@Args('updateUserInput') updateUserInput: UserInput) {
    return this.userService.updatePassword(updateUserInput);
  }
}
