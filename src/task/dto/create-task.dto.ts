import { IsNotEmpty } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    readonly title: string;

    readonly description: string;

    @IsNotEmpty()
    readonly projectId: number;

    @IsNotEmpty()
    readonly priorityId: number;

    @IsNotEmpty()
    readonly typeId: number;

    readonly assigneeId: number;
}