import { Prisma } from '@prisma/client';
import { TestingInvitationDto } from '../dto';
import { DEFAULT_INVITATION } from '../configs';

export const convertTestingInvitationDtoToInvitationData = (
	data: TestingInvitationDto
): Prisma.RoomInvitationUncheckedCreateInput => {
	const {
		user,
		status = DEFAULT_INVITATION.status,
		inviter = DEFAULT_INVITATION.inviter,
		room = DEFAULT_INVITATION.room,
	} = data;

	return {
		status,
		userId: user?.id,
		inviterId: inviter.id,
		roomId: room.id,
	};
};
