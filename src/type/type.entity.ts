import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskPriority, TaskType, TypeType } from "./enum";

@Entity('type')
export class Type {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type: 'enum',
        enum: TypeType
    })
    type: TypeType;

    @Column()
    value: TaskPriority | TaskType;

    @Column()
    text: string;
}