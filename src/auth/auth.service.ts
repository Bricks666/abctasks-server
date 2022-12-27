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

		const isValidPassword = await compare(dto.password, user.get('password'));

		if (!isValidPassword) {
			throw new BadRequestException();
		}

		const secureUser: SecurityUserDto = {
			login: user.login,
			id: user.id,
			photo: user.photo,
		};

		const tokens = await this.generateToken(secureUser);

		return { user: secureUser, tokens, };
	}

	async refresh(refreshToken: string): Promise<TokensDto> {
		const authUser = await this.verifyUser(refreshToken);
		return this.generateToken({
			login: authUser.login,
			photo: authUser.photo,
			id: authUser.id,
		});
	}

	private async generateToken(user: SecurityUserDto): Promise<TokensDto> {
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

	async verifyUser(token: string): Promise<SecurityUserDto> {
		try {
			return this.jwtService.verifyAsync<SecurityUserDto>(token, {
				secret: process.env.SECRET,
			});
		} catch (error) {
			throw new UnauthorizedException('jwt expired');
		}
	}
}
