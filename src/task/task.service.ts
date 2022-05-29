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
        const newTask = Object.assign(new Task(), createTaskDto);
        return this.taskRepository.save(newTask);
    }

    async save(task: Partial<Task>): Promise<Task> {
        return this.taskRepository.save(task);
    }
}
