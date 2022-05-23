import { User } from "../user.entity";
import { UserDto } from "./user.dto";

export const userResDto = (
    data: User
): UserDto => {
    const {
        id,
        username,
        email
    } = data;
    let userDto: UserDto = {
        id,
        username,
        email
    };
    return userDto;
}