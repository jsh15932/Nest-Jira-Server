import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async login(user: any) {
        const checkedUser = await this.userService.findOneByEmail(user.email);
        const exception = new HttpException('잘못된 인증', HttpStatus.UNAUTHORIZED);
        if(!checkedUser) {
            throw exception;
        } else {
            const passwordMatched = await bcrypt.compare(user.password, checkedUser.password);
            if(!passwordMatched) {
                throw exception;
            }
        }
    }

    async validateUser(payload: any): Promise<any> {
        const user = await this.userService.findOneByEmail(payload.email);
        const exception = new HttpException('잘못된 토큰', HttpStatus.UNAUTHORIZED);
        if(!user) {
            throw exception;
        } else {
            const passwordMatched = await bcrypt.compare(payload.password, user.password);
            if(!passwordMatched) {
                throw exception;
            }
        }
        return user;
    }
} 

