import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { normalizePaginationParams } from '@/shared';
import { SecurityUserDto, UserDto } from '../../dto';
import { UserRepository } from '../../repositories';
import {
	CreateParams,
	GetAllParams,
	GetInsecureParams,
	GetOneParams,
	UpdateParas
} from './types';

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UserRepository) {}

	async getAll(params: GetAllParams): Promise<SecurityUserDto[]> {
		const { page, count, ...rest } = params;
		const { limit, offset, } = normalizePaginationParams({ page, count, });

		return this.usersRepository.getAll({ ...rest, limit, offset, });
	}

	async getOne(params: GetOneParams): Promise<SecurityUserDto> {
		const user = await this.usersRepository.getOne(params);

		if (!user) {
			throw new NotFoundException('User was not found');
		}

		return user;
	}

	async create(params: CreateParams): Promise<SecurityUserDto> {
		const { password, ...rest } = params;
		try {
			return await this.usersRepository.create({
				...rest,
				password: await hash(password, Number(process.env.ROUND_COUNT)),
			});
		} catch (error) {
			throw new ConflictException('User already exists', { cause: error, });
		}
	}

	async getInsecure(params: GetInsecureParams): Promise<UserDto> {
		const user = await this.usersRepository.getOneByLogin(params);

		if (!user) {
			throw new NotFoundException('User was not found');
		}

		return user;
	}

	async update(params: UpdateParas): Promise<SecurityUserDto> {
		const { id, ...rest } = params;

		return this.usersRepository.update({ id, ...rest, });
	}
}
