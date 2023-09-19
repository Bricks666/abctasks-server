import { Prisma } from '@prisma/client';
import { TasksFiltersDto } from '../../dto';

export const prepareWhere = (
	filters: TasksFiltersDto
): Prisma.TaskWhereInput => {
	const where: Prisma.TaskWhereInput = {};

	if (filters.tagIds) {
		where.tagIds = {
			hasSome: filters.tagIds,
		};
	}
	if (filters.authorIds) {
		where.authorId = {
			in: filters.authorIds,
		};
	}
	if (filters.after || filters.before) {
		where.createdAt = {
			gte: filters.after,
			lte: filters.before,
		};
	}

	return where;
};
