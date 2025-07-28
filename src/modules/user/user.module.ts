// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from '../user/user.service';
import { UserController } from './user.controller';
import { Roles } from './entities/Roles';
import { Users } from './entities/Users';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // makes it usable in other modules like AuthModule
})
export class UserModule {}
