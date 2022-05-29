import { Type } from "src/type/type.entity";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('task')
export class Task {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    taskId: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    reporterId: string;

    @Column()
    assigneeId: string;

    @ManyToOne(
        types => Type,
        type => type.id
    )
    @JoinTable()
    types: Type;

    @Column()
    projectId: string;

    @ManyToOne(
        types => Type,
        type => type.id
    )
    @JoinTable()
    priority: Type;
}