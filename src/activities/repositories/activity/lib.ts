import { Prisma } from '@prisma/client';
import { ActivitiesFiltersDto } from '../../dto';

export const prepareWhere = (
	filters: ActivitiesFiltersDto
): Prisma.ActivityWhereInput => {
	return {
		actionId: { in: filters.actionIds, },
		activistId: { in: filters.activistIds, },
		createdAt: {
			gte: filters.after,
			lte: filters.before,
		},
		sphereId: {
			in: filters.sphereIds,
		},
	};
};
