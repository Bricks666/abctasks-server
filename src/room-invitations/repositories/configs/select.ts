import { Prisma } from '@prisma/client';

import { SECURITY_USER_SELECT } from '@/users';

export const invitationSelect = {
	id: true,
	inviter: {
		select: SECURITY_USER_SELECT,
	},
	room: true,
	user: {
		select: SECURITY_USER_SELECT,
	},
	status: true,
} satisfies Prisma.RoomInvitationSelect;
