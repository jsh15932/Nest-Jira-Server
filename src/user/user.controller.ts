import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }
}
