import { Prisma } from '@prisma/client';
import { TasksFiltersDto } from '../../dto';

export const prepareWhere = (
	filters: TasksFiltersDto
): Prisma.TaskWhereInput => {
	return {
		tagIds: {
			hasSome: filters.tagIds,
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
