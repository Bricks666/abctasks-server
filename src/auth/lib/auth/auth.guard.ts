import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { SecurityUserDto } from '@/users';
import { extractAccessToken } from '@/shared';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	async canActivate(context: ExecutionContext) {
		const req: Request = context.switchToHttp().getRequest();
		const tokenPair = extractAccessToken(req);

		if (!tokenPair) {
			throw new UnauthorizedException();
		}
		const [bearer, token] = tokenPair;

		if (bearer !== 'Bearer') {
			throw new UnauthorizedException();
		}
		let user: SecurityUserDto;
		try {
			user = await this.jwtService.verifyAsync<SecurityUserDto>(token, {
				secret: process.env.SECRET,
			});
		} catch {
			throw new UnauthorizedException();
		}

		if (user) {
			(req as any).user = user;

			return true;
		}

		return false;
	}
}
