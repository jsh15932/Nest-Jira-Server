import { IsNotEmpty } from "class-validator";

export class updateProjectDto {
    @IsNotEmpty()
    readonly id: string;

    @IsNotEmpty()
    readonly code: string;

    @IsNotEmpty()
    readonly title: string;

    readonly description: string;
}