import { Prisma } from '@prisma/client';
import { SECURITY_USER_SELECT } from '@/users';

export const activitySelect = {
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

export const activityActionSelect = {
	id: true,
	name: true,
} satisfies Prisma.ActivityActionSelect;

export const activitySphereSelect = {
	id: true,
	name: true,
} satisfies Prisma.ActivitySphereSelect;
