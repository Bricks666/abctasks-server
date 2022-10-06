import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService } from '@/users/users.service';
import { CreateUserDto, SecurityUserDto } from '@/users/dto';
import { AuthenticationResult, Tokens } from './types';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) {}

	async authentication(token: string): Promise<AuthenticationResult> {
		const authUser = await this.jwtService.verifyAsync<SecurityUserDto>(token, {
			secret: process.env.SECRET,
		});

		const user = await this.usersService.getUser({ userId: authUser.userId });

		if (!user) {
			throw new BadRequestException();
		}
		const tokens = await this.generateToken(user);

		return {
			user,
			tokens,
		};
	}

	async registration(dto: CreateUserDto): Promise<SecurityUserDto> {
		return this.usersService.createUser(dto);
	}
	async login(dto: LoginDto): Promise<AuthenticationResult> {
		const user = await this.usersService.getInsecureUser(dto);
		if (!user) {
			throw new BadRequestException();
		}

		const isValidPassword = await compare(dto.password, user.get('password'));

		if (!isValidPassword) {
			throw new BadRequestException();
		}

		const secureUser: SecurityUserDto = {
			login: user.get('login'),
			userId: user.get('userId'),
			photo: user.get('photo'),
		};

		const tokens = await this.generateToken(user);

		return { user: secureUser, tokens };
	}

	async refresh(refreshToken: string): Promise<Tokens> {
		const authUser = await this.jwtService.verifyAsync<SecurityUserDto>(
			refreshToken,
			{ secret: process.env.SECRET }
		);
		return this.generateToken({
			login: authUser.login,
			photo: authUser.photo,
			userId: authUser.userId,
		});
	}

	private async generateToken(user: SecurityUserDto): Promise<Tokens> {
		const accessToken = this.jwtService.signAsync(user, {
			secret: process.env.SECRET,
			expiresIn: '15m',
		});
		const refreshToke = this.jwtService.signAsync(user, {
			secret: process.env.SECRET,
			expiresIn: '30d',
		});
		const tokens = await Promise.all([refreshToke, accessToken]);
		return {
			refreshToken: tokens[0],
			accessToken: tokens[1],
		};
	}
}
