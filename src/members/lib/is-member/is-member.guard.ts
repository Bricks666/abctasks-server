import { Request } from 'express';
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common';
import { SecurityUserDto } from '@/users';
import { MembersService } from '../../services';

@Injectable()
export class IsMemberGuard implements CanActivate {
	constructor(private readonly membersService: MembersService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest<Request>();
		const { roomId, id, } = req.params;
		if (typeof roomId === 'undefined' && typeof id === 'undefined') {
			throw new Error('Incorrect using of IsMemberGuard');
		}

		const user = (req as any).user as SecurityUserDto;
		if (!user) {
			return false;
		}
		const { id: userId, } = user;
		const roomExistsUser = await this.membersService.isExists({
			roomId: Number(roomId || id),
			userId,
		});

		if (!roomExistsUser) {
			throw new ForbiddenException("You don't have access");
		}
		return true;
	}
}
