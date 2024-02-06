import { Prisma } from '@prisma/client';
import { SECURITY_USER_SELECT } from '@/users';

export const select = {
	id: true,
	roomId: true,
	room_user: {
		select: {
			user: {
				select: SECURITY_USER_SELECT,
			},
		},
	},
	sphere: true,
	action: true,
	createdAt: true,
} satisfies Prisma.ActivitySelect;
