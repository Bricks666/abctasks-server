import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { normalizePaginationParams } from '@/utils';
import {
	GetUsersQueryDto,
	CreateUserDto,
	GetUserDto,
	UpdateUserDto,
	SecurityUserDto,
	UserDto
} from './dto';
import { UserRepository } from './repository';

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UserRepository) {}

	async getAll(dto: GetUsersQueryDto): Promise<SecurityUserDto[]> {
		const { limit, offset, } = normalizePaginationParams(dto);

		return this.usersRepository.getAll(dto, limit, offset);
	}

	async getOne(dto: GetUserDto): Promise<SecurityUserDto> {
		const user = await this.usersRepository.getOne(dto.id);

		if (!user) {
			throw new NotFoundException();
		}

		return user;
	}

	async create(dto: CreateUserDto): Promise<SecurityUserDto> {
		return this.usersRepository.create({
			...dto,
			password: await hash(dto.password, Number(process.env.ROUND_COUNT)),
		});
	}

	async getInsecure(login: string): Promise<UserDto> {
		const user = await this.usersRepository.getOneByLogin(login);

		if (!user) {
			throw new NotFoundException();
		}

		return user;
	}

	async update(id: number, dto: UpdateUserDto): Promise<SecurityUserDto> {
		return this.usersRepository.update(id, dto);
	}
}
