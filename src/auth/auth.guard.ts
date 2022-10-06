import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SecurityUserDto } from '@/users/dto';
import { extractAccessToken } from '@/utils';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	async canActivate(context: ExecutionContext) {
		const tokenPair = extractAccessToken(context.switchToHttp().getRequest());
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

		return !!user;
	}
}
