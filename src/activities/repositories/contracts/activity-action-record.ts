import { Prisma } from '@prisma/client';
import { activityActionSelect } from '../config';

export type ActivityActionRecord = Prisma.ActivityActionGetPayload<{
	select: typeof activityActionSelect;
}>;
