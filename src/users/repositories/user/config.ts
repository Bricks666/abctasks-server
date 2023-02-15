import { Prisma } from '@prisma/client';

export const SECURITY_USER_SELECT = {
	id: true,
	username: true,
	email: true,
	photo: true,
} satisfies Prisma.userSelect;
