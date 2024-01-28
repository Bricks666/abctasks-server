import { Prisma } from '@prisma/client';
import { TestingInvitationDto } from '../dto';
import { DEFAULT_INVITATION } from '../configs';

export const convertTestingInvitationDtoToInvitationUpdate = (
	data: TestingInvitationDto
): Prisma.RoomInvitationUpdateInput => {
	const { status = DEFAULT_INVITATION.status, } = data;

	return {
		status,
	};
};
