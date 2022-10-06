import { Tokens } from './types/auth.service.types';
import { BASE_COOKIE_OPTIONS, COOKIE_NAME, COOKIE_TIME } from '@/const/cookie';
import { CreateUserDto, SecurityUserDto } from '@/users/dto';
import {
	Body,
	Controller,
	Delete,
	Get,
	Post,
	Req,
	Res,
	UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto';
import { AuthenticationResult } from './types';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Get('auth')
	async authentication(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	): Promise<AuthenticationResult> {
		const accessToken = req.cookies[COOKIE_NAME];

		if (!accessToken) {
			throw new UnauthorizedException();
		}

		const result = await this.authService.authentication(accessToken);

		res.cookie(COOKIE_NAME, result.tokens.refreshToken, {
			...BASE_COOKIE_OPTIONS,
			maxAge: COOKIE_TIME,
		});

		return result;
	}

	@Post('registration')
	async registration(@Body() dto: CreateUserDto): Promise<SecurityUserDto> {
		return this.authService.registration(dto);
	}

	@Post('login')
	async login(
		@Res({ passthrough: true }) res: Response,
		@Body() dto: LoginRequestDto
	) {
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

	@Delete('logout')
	async logout(@Res() res: Response): Promise<void> {
		res.clearCookie(COOKIE_NAME);
	}

	@Get('refresh')
	async refresh(@Req() req: Request, @Res() res: Response): Promise<Tokens> {
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
