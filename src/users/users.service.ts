import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { hash } from 'bcrypt';
import { Op } from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserByLoginDto } from './dto/get-user-by-login.dto';
import { GetUserDto } from './dto/get-user.dto';
import { SecurityUserDto } from './dto/security-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private readonly usersRepository: typeof User
	) {}

	async getAll(): Promise<SecurityUserDto[]> {
		return this.usersRepository.findAll({
			attributes: {
				exclude: ['password'],
			},
		});
	}

	async getOne(dto: GetUserDto): Promise<SecurityUserDto> {
		const user = await this.usersRepository.findOne({
			attributes: {
				exclude: ['password'],
			},
			where: {
				id: dto.id,
			},
		});

		if (!user) {
			throw new NotFoundException();
		}

		return {
			login: user.login,
			id: user.id,
			photo: user.photo,
		};
	}

	async getOneByLogin(dto: GetUserByLoginDto): Promise<SecurityUserDto> {
		const user = await this.usersRepository.findOne({
			attributes: {
				exclude: ['password'],
			},
			where: {
				login: dto.login,
			},
		});

		if (!user) {
			throw new NotFoundException();
		}

		return user;
	}

	async getAllByLogin(dto: GetUserByLoginDto): Promise<SecurityUserDto[]> {
		return this.usersRepository.findAll({
			attributes: {
				exclude: ['password'],
			},
			where: {
				login: {
					[Op.like]: `${dto.login}%`,
				},
			},
		});
	}

	async create(dto: CreateUserDto): Promise<SecurityUserDto> {
		const user = await this.usersRepository.create({
			...dto,
			password: await hash(dto.password, Number(process.env.ROUND_COUNT)),
		});

		return {
			id: user.id,
			login: user.login,
			photo: user.photo,
		};
	}

	async getInsecure(login: string): Promise<User> {
		const user = await this.usersRepository.findOne({
			where: {
				login,
			},
		});

		if (!user) {
			throw new NotFoundException();
		}

		return user;
	}

	async update(id: number, dto: UpdateUserDto): Promise<SecurityUserDto> {
		await this.usersRepository.update(
			{
				password: dto.password,
				photo: dto.photo,
			},
			{
				where: {
					id,
				},
			}
		);

		return this.getOne({ id, }) as Promise<SecurityUserDto>;
	}
}
