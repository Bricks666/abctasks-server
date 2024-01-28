import { Prisma } from '@prisma/client';

import { SECURITY_USER_SELECT } from '@/users';

export const taskSelect = {
	id: true,
	roomId: true,
	title: true,
	description: true,
	status: true,
	tags: {
		select: {
			tag: true,
		},
	},
	author: {
		select: {
			user: { select: SECURITY_USER_SELECT, },
		},
	},
	updatedAt: true,
	createdAt: true,
} satisfies Prisma.TaskSelect;
