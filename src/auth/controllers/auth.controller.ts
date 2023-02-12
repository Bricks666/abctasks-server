import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	Post,
	Res
} from '@nestjs/common';
import { Response } from 'express';
import {
	ApiBody,
	ApiCookieAuth,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger';
import { BASE_COOKIE_OPTIONS, COOKIE_NAME, COOKIE_TIME } from '@/const/cookie';
import { CreateUserDto, SecurityUserDto } from '@/users';
import { Cookie } from '@/shared';
import { AuthService } from '../services';
import {
	AuthenticationResultDto,
	LoginDto,
	LoginRequestDto,
	TokensDto
} from '../dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({
		summary: 'Авторизация по куки',
	})
	@ApiOkResponse({
		type: AuthenticationResultDto,
	})
	@ApiCookieAuth()
	@Get('/')
	async authentication(
		@Cookie(COOKIE_NAME) token: string | null,
		@Res({ passthrough: true, }) res: Response
	): Promise<AuthenticationResultDto> {
		if (!token) {
			throw new ForbiddenException('There is not refresh token');
		}

		const result = await this.authService.authentication({ token, });

		res.cookie(COOKIE_NAME, result.tokens.refreshToken, {
			...BASE_COOKIE_OPTIONS,
			maxAge: COOKIE_TIME,
		});

		return result;
	}

	@ApiOperation({ summary: 'Регистрация нового пользователя', })
	@ApiBody({
		description: 'Данные для регистрации в системе',
	})
	@ApiCreatedResponse({
		type: SecurityUserDto,
		description: 'Подтверждение успешности регистрации',
	})
	@Post('registration')
	async registration(@Body() body: CreateUserDto): Promise<SecurityUserDto> {
		return this.authService.registration(body);
	}

	@ApiOperation({ summary: 'Вход пользователя в аккаунт', })
	@ApiBody({ type: LoginDto, description: 'Данные для входа в систему', })
	@ApiCreatedResponse({
		type: AuthenticationResultDto,
		description: 'Данные пользователя и пара токенов',
	})
	@Post('login')
	async login(
		@Res({ passthrough: true, }) res: Response,
		@Body() body: LoginRequestDto
	): Promise<AuthenticationResultDto> {
		const { rememberMe, ...dto } = body;
		const result = await this.authService.login(dto);

		if (rememberMe) {
			res.cookie(COOKIE_NAME, result.tokens.refreshToken, {
				...BASE_COOKIE_OPTIONS,
				maxAge: COOKIE_TIME,
			});
		}

		return result;
	}

	@ApiOperation({ summary: 'Выход их аккаунта', })
	@ApiOkResponse({
		type: Boolean,
		description: 'Подтверждение успешности выхода',
	})
	@Delete('logout')
	async logout(@Res({ passthrough: true, }) res: Response): Promise<boolean> {
		res.clearCookie(COOKIE_NAME);
		return true;
	}

	@ApiOperation({ summary: 'Обновление токена доступа', })
	@ApiOkResponse({
		type: TokensDto,
		description: 'Обновленная пара токенов',
	})
	@ApiCookieAuth()
	@Get('refresh')
	async refresh(
		@Cookie(COOKIE_NAME) token: string | null,
		@Res({ passthrough: true, }) res: Response
	): Promise<TokensDto> {
		if (!token) {
			throw new ForbiddenException('There is not refresh token');
		}

		const tokens = await this.authService.refresh({ token, });

		res.cookie(COOKIE_NAME, tokens.refreshToken, {
			...BASE_COOKIE_OPTIONS,
			maxAge: COOKIE_TIME,
		});

		return tokens;
	}
}
