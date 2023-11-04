import {
	ConflictException,
	ForbiddenException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService, SecurityUserDto } from '@/users';
import { MailService } from '@/mail';
import { AuthenticationResultDto, TokensDto } from '../../dto';
import { AuthTokensService } from '../auth-tokens';
import {
	ActivateParams,
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
		private readonly authTokenService: AuthTokensService,
		private readonly mailService: MailService
	) {}

	async authentication(
		params: AuthenticationParams
	): Promise<AuthenticationResultDto> {
		const authUser = await this.verifyUser(params);
		const user = await this.usersService.getOne({ id: authUser.id, });

		const tokens = await this.#generateTokens(user);

		return {
			user,
			tokens,
		};
	}

	async registration(params: RegistrationParams): Promise<SecurityUserDto> {
		const user = await this.usersService.create(params);

		const tokens = await this.#generateTokens(user);

		const url = `${process.env.CLIENT_APP_HOST}/registration/activate?token=${tokens.refreshToken}`;

		await this.mailService.sendEmailConfirmation({
			url,
			name: user.username,
			email: user.email,
		});

		return user;
	}

	async activate(params: ActivateParams): Promise<boolean> {
		const user = await this.verifyUser(params);

		const isActivated = await this.usersService.isActivated({ id: user.id, });

		if (isActivated) {
			throw new ConflictException(
				'User with the same email is already registered'
			);
		}

		return this.usersService.activate({ id: user.id, });
	}

	async login(params: LoginParams): Promise<AuthenticationResultDto> {
		const { email, password, } = params;

		const user = await this.usersService.getInsecure({ email, });

		const isValidPassword = await compare(password, user.password);

		if (!isValidPassword) {
			throw new ForbiddenException('Incorrect password');
		}

		user.password = undefined;

		const tokens = await this.#generateTokens(user);

		return { user, tokens, };
	}

	async refresh(params: RefreshParams): Promise<TokensDto> {
		try {
			const authUser = await this.verifyUser(params);

			return this.#generateTokens({
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
			return await this.authTokenService.verifyToken(token);
		} catch (error) {
			throw new UnauthorizedException('jwt expired', { cause: error, });
		}
	}

	async #generateTokens(user: SecurityUserDto): Promise<TokensDto> {
		const accessToken = this.authTokenService.generateAccessToken(user);
		const refreshToke = this.authTokenService.generateRefreshToken(user);

		const tokens = await Promise.all([refreshToke, accessToken]);
		return {
			refreshToken: tokens[0],
			accessToken: tokens[1],
		};
	}
}
