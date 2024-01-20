import { PartialType } from '@nestjs/swagger';
import { UserDto } from '@/users';

export class TestingUserDto extends PartialType(UserDto) {}
