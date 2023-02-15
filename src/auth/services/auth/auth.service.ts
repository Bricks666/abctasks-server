import { JwtService } from '@nestjs/jwt';
import {
	ForbiddenException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService, SecurityUserDto } from '@/users';
import { AuthenticationResultDto, TokensDto } from '../../dto';
import {
	AuthenticationParams,
	LoginParams,
	RefreshParams,
	RegistrationParams,
	VerifyUserParams
} from './types';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService
	) {}

	async authentication(
		params: AuthenticationParams
	): Promise<AuthenticationResultDto> {
		const authUser = await this.verifyUser(params);
		const user = await this.usersService.getOne({ id: authUser.id, });

		const tokens = await this.#generateToken(user);

		return {
			user,
			tokens,
		};
	}

	async registration(params: RegistrationParams): Promise<SecurityUserDto> {
		return this.usersService.create(params);
	}

	async login(params: LoginParams): Promise<AuthenticationResultDto> {
		const { email, password, } = params;

		const user = await this.usersService.getInsecure({ email, });

		const isValidPassword = await compare(password, user.password);

		if (!isValidPassword) {
			throw new UnauthorizedException('Incorrect password');
		}

		user.password = undefined;

		const tokens = await this.#generateToken(user);

		return { user, tokens, };
	}

	async refresh(params: RefreshParams): Promise<TokensDto> {
		try {
			const authUser = await this.verifyUser(params);

			return this.#generateToken({
				id: authUser.id,
				username: authUser.username,
				photo: authUser.photo,
				email: authUser.email,
			});
		} catch (error) {
			throw new ForbiddenException('Refresh token is incorrect', {
				cause: error,
			});
		}
	}

	async verifyUser(params: VerifyUserParams): Promise<SecurityUserDto> {
		const { token, } = params;

		try {
			return await this.jwtService.verifyAsync<SecurityUserDto>(token, {
				secret: process.env.SECRET,
			});
		} catch (error) {
			throw new UnauthorizedException('jwt expired', { cause: error, });
		}
	}

	async #generateToken(user: SecurityUserDto): Promise<TokensDto> {
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
}
