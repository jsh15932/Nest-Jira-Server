import { Body, Controller, Post, Res, HttpStatus, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post('/register')
    async register(@Res() res, @Body() registerUserDto: RegisterUserDto) {
        const isRegisterd = await this.userService.findOneByEmail(registerUserDto.email);
        if(isRegisterd) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: '이미 존재하는 이메일'
            });
            return;
        }
        const user = await this.userService.create(registerUserDto);
        if(user) {
            const {
                password,
                ...result
            } = user;
            res.status(HttpStatus.OK).send(result);
        } else {
            res.status(HttpStatus.BAD_REQUEST).send();
        }
    }
    
    @Post('/login')
    async login(@Req() req) {
        return this.authService.login(req.Body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/profile')
    getProfile(@Req() req) {
        const {
            password,
            ...user
        } = req.user;
        return user;
    }
}
