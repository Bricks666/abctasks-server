import { Prisma } from '@prisma/client';
import { TestingInvitationDto } from '../dto';

export const convertTestingInvitationDtoToInvitationFilter = (
	data: TestingInvitationDto
): Prisma.RoomInvitationWhereInput => {
	const { id, user, status, inviter, room, } = data;

	return {
		id,
		status,
		userId: user?.id,
		inviterId: inviter.id,
		roomId: room.id,
	};
};
