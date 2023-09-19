import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { SecurityUserDto } from '@/users';
import { extractAccessToken } from '@/shared';
import { DISABLE_AUTH_CHECK_FLAG } from './config';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly reflector: Reflector
	) {}

	async canActivate(context: ExecutionContext) {
		const noCheck = this.reflector.get(
			DISABLE_AUTH_CHECK_FLAG,
			context.getHandler()
		);

		const req: Request = context.switchToHttp().getRequest();

		const tokenPair = extractAccessToken(req);
		if (!tokenPair) {
			if (noCheck) {
				return true;
			}
			throw new UnauthorizedException('there is not token');
		}

		const [bearer, token] = tokenPair;
		if (bearer !== 'Bearer') {
			if (noCheck) {
				return true;
			}
			throw new UnauthorizedException('It is not bearer token');
		}

		let user: SecurityUserDto;
		try {
			user = await this.jwtService.verifyAsync<SecurityUserDto>(token, {
				secret: process.env.SECRET,
			});
		} catch {
			if (noCheck) {
				return true;
			}
			throw new UnauthorizedException('invalid decoding');
		}

		if (user) {
			(req as any).user = user;

			return true;
		}

		return false;
	}
}
