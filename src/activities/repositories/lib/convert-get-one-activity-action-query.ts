import { Prisma } from '@prisma/client';
import { GetOneActivityActionQuery } from '../contracts';
import { activityActionSelect } from '../config';

export const convertGetOneActivityActionQuery = (
	query: GetOneActivityActionQuery
): Prisma.ActivityActionFindUniqueArgs => {
	return {
		where: {
			name: query.name,
		},
		select: activityActionSelect,
	};
};
