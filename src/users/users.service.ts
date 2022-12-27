import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { hash } from 'bcrypt';
import { Op } from 'sequelize';
import { Room } from '@/rooms/models';
import {
	GetUsersQueryDto,
	CreateUserDto,
	GetUserByLoginDto,
	GetUserDto,
	SecurityUserDto,
	UpdateUserDto
} from './dto';
import { User } from './models';
import { normalizePaginationParams } from '@/utils';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private readonly usersRepository: typeof User
	) {}

	async getAll(dto: GetUsersQueryDto): Promise<SecurityUserDto[]> {
		const where: Record<string, any> = {};
		const includeWhere: Record<string, any> = {};
		const throughWhere: Record<string, any> = {};

		const { limit, offset, } = normalizePaginationParams(dto);

		if (typeof dto.login !== 'undefined') {
			where.login = { [Op.like]: `${dto.login}%`, };
		}

		if (typeof dto.roomId !== 'undefined') {
			includeWhere.id = dto.roomId;
			throughWhere.removed = false;
		}

		return this.usersRepository.findAll({
			attributes: {
				exclude: ['password'],
			},
			limit,
			offset,
			where,
			include: [
				{
					model: Room,
					attributes: [],
					where: includeWhere,
					through: {
						where: throughWhere,
						attributes: [],
					},
				}
			],
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

		return user;
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

		return this.getOne({ id, });
	}
}
