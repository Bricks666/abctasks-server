import { JwtService } from '@nestjs/jwt';
import {
	BadRequestException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService } from '@/users/users.service';
import { CreateUserDto, SecurityUserDto } from '@/users/dto';
import { AuthenticationResultDto, LoginDto, TokensDto } from './dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) {}

	async authentication(token: string): Promise<AuthenticationResultDto> {
		const authUser = await this.verifyUser(token);
		const user = await this.usersService.getOne({ id: authUser.id, });

		const tokens = await this.generateToken(user);

		return {
			user,
			tokens,
		};
	}

	async registration(dto: CreateUserDto): Promise<SecurityUserDto> {
		return this.usersService.create(dto);
	}

	async login(dto: LoginDto): Promise<AuthenticationResultDto> {
		const user = await this.usersService.getInsecure(dto.login);

		const isValidPassword = await compare(dto.password, user.password);

		if (!isValidPassword) {
			throw new BadRequestException();
		}

		user.password = undefined;

		const tokens = await this.generateToken(user);

		return { user, tokens, };
	}

	async refresh(refreshToken: string): Promise<TokensDto> {
		const authUser = await this.verifyUser(refreshToken);
		return this.generateToken({
			id: authUser.id,
			login: authUser.login,
			photo: authUser.photo,
		});
	}

	private async generateToken(user: SecurityUserDto): Promise<TokensDto> {
		const accessToken = this.jwtService.signAsync(user, {
			secret: process.env.SECRET,
			expiresIn: '10m',
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

	async verifyUser(token: string): Promise<SecurityUserDto> {
		try {
			return await this.jwtService.verifyAsync<SecurityUserDto>(token, {
				secret: process.env.SECRET,
			});
		} catch (error) {
			throw new UnauthorizedException('jwt expired', { cause: error, });
		}
	}
}
