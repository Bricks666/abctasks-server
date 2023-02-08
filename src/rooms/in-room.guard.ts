import { Request } from 'express';
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common';
import { RoomsService } from '@/rooms/rooms.service';
import { AuthService } from '@/auth/auth.service';
import { extractAccessToken } from '@/lib';

@Injectable()
export class InRoomGuard implements CanActivate {
	constructor(
		private readonly roomsService: RoomsService,
		private readonly authService: AuthService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest<Request>();
		const { roomId, id, } = req.params;
		if (typeof roomId === 'undefined' && typeof id === 'undefined') {
			throw new Error('Incorrect using of InRoomGuard');
		}

		const [, token] = extractAccessToken(req);
		const { id: userId, } = await this.authService.verifyUser({ token, });
		const roomExistsUser = await this.roomsService.roomExistsUser({
			roomId: Number(roomId || id),
			userId,
		});

		if (!roomExistsUser) {
			throw new ForbiddenException("You don't have access");
		}
		return true;
	}
}
