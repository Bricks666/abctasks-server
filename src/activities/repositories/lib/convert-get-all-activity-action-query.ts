import { Prisma } from '@prisma/client';
import { activityActionSelect } from '../config';

export const convertGetallActivityActionQuery =
	(): Prisma.ActivityActionFindManyArgs => {
		return {
			select: activityActionSelect,
		};
	};
