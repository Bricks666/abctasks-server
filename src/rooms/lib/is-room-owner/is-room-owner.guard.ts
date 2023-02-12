import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common';
import { Request } from 'express';
import { SecurityUserDto } from '@/users/dto';
import { RoomsService } from '../../services';

@Injectable()
export class IsRoomOwnerGuard implements CanActivate {
	constructor(private readonly roomsService: RoomsService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest<Request>();
		const { roomId, id, } = req.params;
		if (typeof roomId === 'undefined' && typeof id === 'undefined') {
			throw new Error('Incorrect using of InRoomGuard');
		}

		const { id: userId, } = (req as any).user as SecurityUserDto;
		const isOwner = await this.roomsService.isOwner({
			id: Number(roomId ?? id),
			userId,
		});

		if (!isOwner) {
			throw new ForbiddenException("You don't have access");
		}
		return true;
	}
}
