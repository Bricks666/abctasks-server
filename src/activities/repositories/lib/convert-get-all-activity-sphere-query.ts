import { Prisma } from '@prisma/client';
import { activityActionSelect } from '../config';

export const convertGetallActivitySphereQuery =
	(): Prisma.ActivitySphereFindManyArgs => {
		return {
			select: activityActionSelect,
		};
	};
