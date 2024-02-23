import { Prisma } from '@prisma/client';
import { CreateActivityActionQuery } from '../contracts';
import { activityActionSelect } from '../config';

export const convertCreateActivityActionQuery = (
	query: CreateActivityActionQuery
) => {
	const { name, } = query;

	return {
		select: activityActionSelect,
		data: {
			name,
		},
	} satisfies Prisma.ActivityActionCreateArgs;
};
