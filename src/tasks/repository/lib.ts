import { Prisma } from '@prisma/client';
import { TasksFiltersDto } from '../dto';

export const prepareWhere = (
	filters: TasksFiltersDto
): Prisma.taskWhereInput => {
	return {
		groupId: {
			in: filters.groupId,
		},
		authorId: {
			in: filters.authorId,
		},
		createdAt: {
			gte: filters.after,
			lte: filters.before,
		},
	};
};
