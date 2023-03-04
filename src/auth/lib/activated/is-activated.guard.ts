import {
	CanActivate,
	ExecutionContext,
	Injectable,
	InternalServerErrorException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { SecurityUserDto, UsersService } from '@/users';
import { DISABLE_AUTH_CHECK_FLAG } from '../auth';
import { DISABLE_IS_ACTIVATED_FLAG } from './config';

@Injectable()
export class IsActivatedGuard implements CanActivate {
	constructor(
		private readonly usersService: UsersService,
		private readonly reflector: Reflector
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const disable =
			this.reflector.get<boolean | undefined>(
				DISABLE_IS_ACTIVATED_FLAG,
				context.getHandler()
			) ||
			this.reflector.get<boolean | undefined>(
				DISABLE_AUTH_CHECK_FLAG,
				context.getHandler()
			);

		if (disable) {
			return true;
		}

		const req: Request = context.switchToHttp().getRequest();
		const user = (req as any).user as SecurityUserDto;

		if (!user) {
			throw new InternalServerErrorException(
				'Is activated must be used only with authorized users'
			);
		}

		return this.usersService.isActivated({ id: user.id, });
	}
}
