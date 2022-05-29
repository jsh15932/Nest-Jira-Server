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
    reporterId: number;

    @Column()
    assigneeId: number;

    // @ManyToOne(
    //     type => loadavg,
    //     lov => lov.id
    // )
    // JoinTable()
    // type: Lov;

    @Column()
    projectId: number;

    // @ManyToOne(
    //     type => Lov,
    //     lov => lov.id
    // )
    // @JoinTable()
    // priority: Lov;
}