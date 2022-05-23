import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>
    ) {}

    async create(params: CreateProjectDto & {
        createdBy: string
    }): Promise<Project> {
        const project = Object.assign(new Project(), params);
        return this.save(project);
    }

    async save(params: Partial<Project>): Promise<Project> {
        return this.projectRepository.save(params);
    }

    async findByCode(code: string): Promise<Project> {
        code = code.toLocaleUpperCase();
        return this.projectRepository.findOne({
            code
        });
    }
}
