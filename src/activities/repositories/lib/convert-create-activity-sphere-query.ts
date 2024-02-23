import { Prisma } from '@prisma/client';
import { CreateActivitySphereQuery } from '../contracts';
import { activitySphereSelect } from '../config';

export const convertCreateActivitySphereQuery = (
	query: CreateActivitySphereQuery
) => {
	const { name, } = query;

	return {
		select: activitySphereSelect,
		data: {
			name,
		},
	} satisfies Prisma.ActivitySphereCreateArgs;
};
