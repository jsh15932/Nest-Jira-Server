import { RegistrationStatus } from './interface/registration-status.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { LoginStatus } from './interface/login-status.interface';
import { User } from 'src/user/user.entity';
import { JwtPayload } from './interface/payload.interface';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async register(userDto: RegisterUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,
            message: '회원가입 성공'
        };
        try {
            await this.userService.create(userDto);
        } catch (err) {
            status = {
                success: false,
                message: err
            }
        }
        return status;
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
        const user = await this.userService.findByLogin(loginUserDto);
        const token = this.createToken(user);
        return {
            username: user.username,
            email: user.email,
            ...token
        };
    }

    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.userService.findByPayload(payload);
        if(!user) {
            throw new HttpException('잘못된 토큰', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    private createToken({ email }: UserDto): any {
        const expiresIn = '3600s';
        const user: JwtPayload = { email };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn,
            accessToken
        };
    }
}

