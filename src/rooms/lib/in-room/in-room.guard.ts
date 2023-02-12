import { Request } from 'express';
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common';
import { RoomUserService } from '@/rooms';
import { SecurityUserDto } from '@/users';

@Injectable()
export class InRoomGuard implements CanActivate {
	constructor(private readonly roomUserService: RoomUserService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest<Request>();
		const { roomId, id, } = req.params;
		if (typeof roomId === 'undefined' && typeof id === 'undefined') {
			throw new Error('Incorrect using of InRoomGuard');
		}

		const { id: userId, } = (req as any).user as SecurityUserDto;
		const roomExistsUser = await this.roomUserService.isExists({
			roomId: Number(roomId || id),
			userId,
		});

		if (!roomExistsUser) {
			throw new ForbiddenException("You don't have access");
		}
		return true;
	}
}
