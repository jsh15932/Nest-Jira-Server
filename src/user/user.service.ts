import { UserDto } from './dto/user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePasswords } from 'src/shared/utils';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './user.entity';
import { userResDto } from './dto/user-res.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async create(registerUserDto: RegisterUserDto): Promise<UserDto> {
        const {
            username,
            email,
            password
        } = registerUserDto;
        const isUserExisted = await this.userRepository.findOne({
            where: {
                email
            }
        });
        if(isUserExisted) {
            throw new HttpException('이미 존재하는 유저', HttpStatus.BAD_REQUEST);
        }
        const user: User = await this.userRepository.create({
            username,
            password,
            email
        });
        await this.userRepository.save(user);
        return userResDto(user);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOneByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({ email });
    }

    async findByLogin({
        email,
        password
    }: LoginUserDto): Promise<UserDto> {
        const user = await this.userRepository.findOne({
            where: { email }
        });
        if(!user) {
            throw new HttpException('존재하지 않는 유저', HttpStatus.UNAUTHORIZED);
        }
        const compare = await comparePasswords(
            user.password,
            password
        );
        if(!compare) {
            throw new HttpException('잘못된 인증', HttpStatus.UNAUTHORIZED);
        }
        return 
    }

    async findOne(options?: object): Promise<UserDto> {
        const user = await this.userRepository.findOne(options);
        return userResDto(user);
    }

    async findByPayload({ email }: any): Promise<UserDto> {
        return await this.findOne({
            where: { email }
        });
    }
}
