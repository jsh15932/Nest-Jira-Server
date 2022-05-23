import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';
import { Response } from 'express';

@Controller('project')
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService
    ) {}

    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    async create(
        @Req() req,
        @Res() res: Response,
        @Body() createProjectDto: CreateProjectDto
    ) {
        const user = req.user as User;
        const code = createProjectDto.code.toLocaleUpperCase();
        const isExisted = await this.projectService.findByCode(code);
        if(isExisted) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: '이미 존재하는 코드'
            });
        }
        const project = await this.projectService.create({
            ...createProjectDto,
            createdBy: user.username
        });
        if(project) {
            res.status(HttpStatus.OK).send();
        } else {
            res.status(HttpStatus.BAD_REQUEST).send();
        }
    }
}
