/* eslint-disable class-methods-use-this */
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Post,
	Req,
	Res,
	UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
	ApiBody,
	ApiCookieAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { BASE_COOKIE_OPTIONS, COOKIE_NAME, COOKIE_TIME } from '@/const/cookie';
import { CreateUserDto, SecurityUserDto } from '@/users/dto';
import { AuthService } from './auth.service';
import {
	AuthenticationResultDto,
	LoginDto,
	LoginRequestDto,
	TokensDto,
} from './dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({
		summary: 'Авторизация по куки',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: AuthenticationResultDto,
	})
	@ApiCookieAuth()
	@Get('/')
	async authentication(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	): Promise<AuthenticationResultDto> {
		const refreshToken = req.cookies[COOKIE_NAME];
		if (!refreshToken) {
			throw new UnauthorizedException();
		}

		const result = await this.authService.authentication(refreshToken);

		res.cookie(COOKIE_NAME, result.tokens.refreshToken, {
			...BASE_COOKIE_OPTIONS,
			maxAge: COOKIE_TIME,
		});

		return result;
	}

	@ApiOperation({ summary: 'Регистрация нового пользователя' })
	@ApiBody({
		type: CreateUserDto,
		description: 'Данные для регистрации в системе',
	})
	@ApiResponse({
		status: 201,
		type: SecurityUserDto,
		description: 'Подтверждение успешности регистрации',
	})
	@Post('registration')
	async registration(@Body() dto: CreateUserDto): Promise<SecurityUserDto> {
		return this.authService.registration(dto);
	}

	@ApiOperation({ summary: 'Вход пользователя в аккаунт' })
	@ApiBody({ type: LoginDto, description: 'Данные для входа в систему' })
	@ApiResponse({
		status: 201,
		type: AuthenticationResultDto,
		description: 'Данные пользователя и пара токенов',
	})
	@Post('login')
	async login(
		@Res({ passthrough: true }) res: Response,
		@Body() dto: LoginRequestDto
	): Promise<AuthenticationResultDto> {
		const { rememberMe, ...loginDto } = dto;
		const result = await this.authService.login(loginDto);

		if (rememberMe) {
			res.cookie(COOKIE_NAME, result.tokens.refreshToken, {
				...BASE_COOKIE_OPTIONS,
				maxAge: COOKIE_TIME,
			});
		}

		return result;
	}

	@ApiOperation({ summary: 'Выход их аккаунта' })
	@ApiResponse({
		status: 200,
		type: Boolean,
		description: 'Подтверждение успешности выхода',
	})
	@Delete('logout')
	async logout(@Res({ passthrough: true }) res: Response): Promise<boolean> {
		res.clearCookie(COOKIE_NAME);
		return true;
	}

	@ApiOperation({ summary: 'Обновление токена доступа' })
	@ApiResponse({
		status: 200,
		type: TokensDto,
		description: 'Обновленная пара токенов',
	})
	@ApiCookieAuth()
	@Get('refresh')
	async refresh(@Req() req: Request, @Res() res: Response): Promise<TokensDto> {
		const refreshToken = req.cookies[COOKIE_NAME];

		if (!refreshToken) {
			throw new UnauthorizedException();
		}

		const tokens = await this.authService.refresh(refreshToken);

		res.cookie(COOKIE_NAME, tokens.refreshToken, {
			...BASE_COOKIE_OPTIONS,
			maxAge: COOKIE_TIME,
		});

		return tokens;
	}
}
