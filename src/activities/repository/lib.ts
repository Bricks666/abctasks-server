import { Prisma } from '@prisma/client';
import { ActivitiesFiltersDto } from '../dto';

export const prepareWhere = (
	filters: ActivitiesFiltersDto
): Prisma.activityWhereInput => {
	return {
		action: filters.action,
		activistId: filters.activistId,
		createdAt: {
			gte: filters.after,
			lte: filters.before,
		},
		sphere: {
			name: filters.sphereName,
		},
	};
};
