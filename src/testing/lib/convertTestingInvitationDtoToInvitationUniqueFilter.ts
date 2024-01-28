import { Prisma } from '@prisma/client';
import { TestingInvitationDto } from '../dto';

export const convertTestingInvitationDtoToInvitationUniqueFilter = (
	data: TestingInvitationDto
): Prisma.RoomInvitationWhereUniqueInput => {
	const { id, } = data;

	return {
		id,
	};
};
