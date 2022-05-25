import { Body, Controller, Delete, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';
import { Response } from 'express';
import { ProjectGuard } from './project.guard';
import { updateProjectDto } from './dto/update-project.dto';

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

    @Put('update')
    @UseGuards(AuthGuard('jwt'), ProjectGuard)
    async update(
        @Res() res: Response,
        @Body() updateProjectDto: updateProjectDto
    ) {
        const updated = await this.projectService.update(updateProjectDto);
        if(updated) {
            res.status(HttpStatus.OK).send();
        } else {
            res.status(HttpStatus.BAD_REQUEST).send();
        }
    }

    @Post('complete/:id')
    @UseGuards(AuthGuard('jwt'), ProjectGuard)
    async completeProject(
        @Res() res: Response,
        @Param() params
    ) {
        const id = params.id;
        const completed = await this.projectService.complete(id);
        if(completed) {
            const updatedLastEntity = await this.projectService.findById(id);
            res.status(HttpStatus.OK).send(updatedLastEntity);
        } else {
            res.status(HttpStatus.BAD_REQUEST).send();
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), ProjectGuard)
    async delete(
        @Res() res: Response,
        @Param() params
    ) {
        const deleted = await this.projectService.delete(params.id);
        if(deleted) {
            res.status(HttpStatus.OK).send(deleted);
        } else {
            res.status(HttpStatus.BAD_REQUEST).send();
        }
    }
}
