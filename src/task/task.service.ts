import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) {}

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const res = Object.assign(new Task(), createTaskDto);
        return this.taskRepository.save(res);
    }
}
