import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Type } from 'src/type/type.entity';
import { ProjectService } from 'src/project/project.service';
import { Project } from 'src/project/project.entity';
import { TypeService } from 'src/type/type.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Type, Project])
  ],
  providers: [TaskService, TypeService, ProjectService],
  controllers: [TaskController]
})
export class TaskModule {}
