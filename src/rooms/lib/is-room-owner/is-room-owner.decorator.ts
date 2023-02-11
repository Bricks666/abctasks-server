import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse } from '@nestjs/swagger';
import { IsRoomOwnerGuard } from './is-room-owner.guard';

export const IsOwner = () => {
	return applyDecorators(
		ApiForbiddenResponse({
			description: 'Пользователь не владелец комнаты',
		}),
		UseGuards(IsRoomOwnerGuard)
	);
};
