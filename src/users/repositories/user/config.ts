import { Prisma } from '@prisma/client';

export const SECURITY_USER_SELECT = {
	id: true,
	login: true,
	photo: true,
} satisfies Prisma.userSelect;
