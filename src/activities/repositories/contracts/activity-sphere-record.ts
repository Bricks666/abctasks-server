import { Prisma } from '@prisma/client';
import { activitySphereSelect } from '../config';

export type ActivitySphereRecord = Prisma.ActivitySphereGetPayload<{
	select: typeof activitySphereSelect;
}>;
