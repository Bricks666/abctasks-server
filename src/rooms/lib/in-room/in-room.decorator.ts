import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse } from '@nestjs/swagger';
import { InRoomGuard } from './in-room.guard';

export const InRoom = () =>
	applyDecorators(
		ApiForbiddenResponse({
			description: 'Пользователь не может совершать действия в данной комнате',
		}),
		UseGuards(InRoomGuard)
	);
