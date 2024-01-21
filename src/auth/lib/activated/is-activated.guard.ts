import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { SecurityUserDto } from '@/users/dto';
import { UsersService } from '@/users/services';
import { DISABLE_IS_ACTIVATED_FLAG } from './config';

@Injectable()
export class IsActivatedGuard implements CanActivate {
	constructor(
		private readonly usersService: UsersService,
		private readonly reflector: Reflector
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const disable = this.reflector.getAllAndOverride<boolean | undefined>(
			DISABLE_IS_ACTIVATED_FLAG,
			[context.getHandler(), context.getClass()]
		);

		if (disable) {
			return true;
		}

		const req: Request = context.switchToHttp().getRequest();
		const user = (req as any).user as SecurityUserDto;

		if (!user) {
			return true;
		}

		return this.usersService.isActivated({ id: user.id, });
	}
}
