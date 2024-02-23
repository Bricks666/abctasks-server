import { Prisma } from '@prisma/client';
import { activitySelect } from '../config';

export type ActivityRecord = Prisma.ActivityGetPayload<{
	select: typeof activitySelect;
}>;
