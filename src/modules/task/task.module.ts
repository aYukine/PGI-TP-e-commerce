import { Module } from '@nestjs/common';
import { TasksController } from './task.controller';
import { TasksService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User])],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [],
  // Add any other necessary configurations or modules
})
export class TaskModule {}
