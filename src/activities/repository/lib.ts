import { Prisma } from '@prisma/client';
import { ActivitiesFiltersDto } from '../dto';

export const prepareWhere = (
	filters: ActivitiesFiltersDto
): Prisma.activityWhereInput => {
	return {
		action: { in: filters.action, },
		activistId: { in: filters.activistId, },
		createdAt: {
			gte: filters.after,
			lte: filters.before,
		},
		sphere: {
			name: { in: filters.sphereName, },
		},
	};
};
