import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { Response } from 'express';

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) {}

    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    async create(@Req() req, @Res() res: Response, @Body() createTaskDto: CreateTaskDto) {
        const user = req.user as User;
        const task = await this.taskService.create(createTaskDto);
    } 
}

