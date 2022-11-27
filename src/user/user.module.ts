import { Module } from '@nestjs/common';

// project imports
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserService],
  controllers: [UserController],
})
export class UserModule {}
