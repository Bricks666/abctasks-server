import { Prisma } from '@prisma/client';
import { GetOneActivitySphereQuery } from '../contracts';

export const convertGetOneActivitySphereQuery = (
	query: GetOneActivitySphereQuery
): Prisma.ActivitySphereFindUniqueArgs => {
	return {
		where: {
			name: query.name,
		},
	};
};
