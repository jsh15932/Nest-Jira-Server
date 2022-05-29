import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from './type.entity';
import { TypeService } from './type.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Type])
  ],
  providers: [TypeService]
})
export class TypeModule {}
