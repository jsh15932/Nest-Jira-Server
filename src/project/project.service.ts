import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.entity';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { updateProjectDto } from './dto/update-project.dto';

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

    async getAll(): Promise<Project[]> {
        return this.projectRepository.find();
    }

    async save(params: Partial<Project>): Promise<Project> {
        return this.projectRepository.save(params);
    }

    async findById(id: string): Promise<Project> {
        return this.projectRepository.findOne({ id });
    }

    async findByCode(code: string): Promise<Project> {
        code = code.toLocaleUpperCase();
        return this.projectRepository.findOne({ code });
    }

    async paginate({ 
        options,
        userId
    }: {
        options: IPaginationOptions;
        userId: string
    }): Promise<Pagination<Project>> {
        const queryBuilder = this.projectRepository.createQueryBuilder('project');
        queryBuilder.orderBy('project.updatedAt', 'DESC');
        queryBuilder.where('project.createdBy = :createdBy', {
            createBy: userId
        });
        return paginate<Project>(queryBuilder, options);
    }

    async update(updateProjectDto: updateProjectDto): Promise<Project> {
        const entity = Object.assign(new Project(), updateProjectDto);
        return this.projectRepository.save(entity);
    }

    async complete(id: string): Promise<UpdateResult> {
        return this.projectRepository.update(id, {
            isCompleted: true
        });
    }

    async delete(id: string): Promise<DeleteResult> {
        return this.projectRepository.delete(id);
    }
}
