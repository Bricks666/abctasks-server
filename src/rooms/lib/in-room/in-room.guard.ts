import { Request } from 'express';
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common';
import { RoomsService } from '@/rooms/rooms.service';
import { SecurityUserDto } from '@/users/dto';

@Injectable()
export class InRoomGuard implements CanActivate {
	constructor(private readonly roomsService: RoomsService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest<Request>();
		const { roomId, id, } = req.params;
		if (typeof roomId === 'undefined' && typeof id === 'undefined') {
			throw new Error('Incorrect using of InRoomGuard');
		}

		const { id: userId, } = (req as any).user as SecurityUserDto;
		const roomExistsUser = await this.roomsService.isExists({
			roomId: Number(roomId || id),
			userId,
		});

		if (!roomExistsUser) {
			throw new ForbiddenException("You don't have access");
		}
		return true;
	}
}
