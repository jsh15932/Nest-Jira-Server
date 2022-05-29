import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeType } from './enum';
import { Type } from './type.entity';

@Injectable()
export class TypeService {
    constructor(
        @InjectRepository(Type)
        private typeRepository: Repository<Type>
    ) {}

    async findAllByType(typeType: TypeType): Promise<Type[]> {
        return this.typeRepository.find({
            where: { type: typeType },
            order: { value: 'DESC' }
        });
    }
    
    async findById(id: string): Promise<Type> {
        return this.typeRepository.findOne({ id });
    }
}
