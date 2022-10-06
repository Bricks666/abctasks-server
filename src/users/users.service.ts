import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserByLoginDto } from './dto/get-user-by-login.dto';
import { GetUserDto } from './dto/get-user.dto';
import { SecurityUserDto } from './dto/security-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private readonly usersRepository: typeof User
	) {}

	async createUser(dto: CreateUserDto): Promise<SecurityUserDto> {
		const user = await this.usersRepository.create(dto);

		return {
			userId: user.userId,
			login: user.login,
			photo: user.photo,
		};
	}

	async getUsers(): Promise<SecurityUserDto[]> {
		return this.usersRepository.findAll({
			attributes: {
				exclude: ['password'],
			},
		});
	}

	async getUser(dto: GetUserDto): Promise<SecurityUserDto | null> {
		return this.usersRepository.findOne({
			attributes: {
				exclude: ['password'],
			},
			where: {
				userId: dto.userId,
			},
		});
	}

	async getUserByLogin(
		dto: GetUserByLoginDto
	): Promise<SecurityUserDto | null> {
		return this.usersRepository.findOne({
			attributes: {
				exclude: ['password'],
			},
			where: {
				login: dto.login,
			},
		});
	}

	async getInsecureUser(dto: Partial<User>): Promise<User | null> {
		return this.usersRepository.findOne({
			where: dto,
		});
	}

	async updateUser(
		userId: number,
		dto: UpdateUserDto
	): Promise<SecurityUserDto> {
		await this.usersRepository.update(
			{
				password: dto.password,
				photo: dto.photo,
			},
			{
				where: {
					userId: userId,
				},
			}
		);

		return this.getUser({ userId }) as Promise<SecurityUserDto>;
	}
}
