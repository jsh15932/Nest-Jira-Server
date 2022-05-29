import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { Response } from 'express';
import { TypeService } from 'src/type/type.service';
import { ProjectService } from 'src/project/project.service';

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService,
        private readonly typeService: TypeService,
        private readonly projectService: ProjectService
    ) {}

    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    async create(@Req() req, @Res() res: Response, @Body() createTaskDto: CreateTaskDto) {
        const user = req.user as User;
        const task = await this.taskService.create(createTaskDto);
        if(task) {
            if(!task.assigneeId) {
                task.assigneeId = user.id;
            }
            task.reporterId = user.id;
            const type = await this.typeService.findById(createTaskDto.typeId);
            task.types = type;
            const priority = await this.typeService.findById(createTaskDto.priorityId);
            task.priority = priority;
            const project = await this.projectService.findById(createTaskDto.projectId);
            const taskId = `${project.code.toLocaleUpperCase()}-${task.id}`;
            task.taskId = taskId;
            const savedTask = await this.taskService.save(task);
            res.status(HttpStatus.OK).send(savedTask);
        } else {
            res.status(HttpStatus.BAD_REQUEST).send();
        }
    } 
}

