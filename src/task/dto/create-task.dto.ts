import { IsNotEmpty } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    readonly title: string;

    readonly description: string;

    @IsNotEmpty()
    readonly projectId: string;

    @IsNotEmpty()
    readonly priorityId: string;

    @IsNotEmpty()
    readonly typeId: string;

    readonly assigneeId: string;
}