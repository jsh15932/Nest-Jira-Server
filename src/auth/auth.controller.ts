import { Body, Controller, Post, Res, HttpStatus, UseGuards, Get, Req, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginStatus } from './interface/login-status.interface';
import { RegistrationStatus } from './interface/registration-status.interface';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('register')
    public async register(
        @Body() reigsterUserDto: RegisterUserDto,
    ): Promise<RegistrationStatus> {
        const res: RegistrationStatus = await this.authService.register(
            reigsterUserDto
        );
        if(!res.success) {
            throw new HttpException(res.message, HttpStatus.BAD_REQUEST);
        }
        return res;
    }

    @Post('login')
    public async login(
        @Body() loginUserDto: LoginUserDto
    ): Promise<LoginStatus> {
        return await this.authService.login(loginUserDto);
    }
}
