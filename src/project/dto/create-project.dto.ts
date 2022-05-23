import { IsNotEmpty } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty()
    readonly code: string;

    @IsNotEmpty()
    readonly title: string;

    readonly description: string;
}