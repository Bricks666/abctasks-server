import {
	applyDecorators,
	UseGuards,
	ForbiddenException,
	HttpStatus
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { InRoomGuard } from '@/rooms/in-room.guard';

export const InRoom = () =>
	applyDecorators(
		ApiResponse({
			status: HttpStatus.FORBIDDEN,
			type: ForbiddenException,
			description: 'Пользователь не может совершать действия в данной комнате',
		}),
		UseGuards(InRoomGuard)
	);
