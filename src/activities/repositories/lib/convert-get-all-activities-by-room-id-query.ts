import { Prisma } from '@prisma/client';
import { convertPaginationQuery } from '@/shared';
import { GetAllActivitiesByRoomIdQuery } from '../contracts';
import { activitySelect } from '../config';

export const convertGetAllActivitiesByRoomIdQuery = (
	query: GetAllActivitiesByRoomIdQuery
) => {
	const {
		by,
		count,
		page,
		roomId,
		type,
		actionIds,
		activistIds,
		after,
		before,
		sphereIds,
	} = query;

	const pagination = convertPaginationQuery({ count, page, });

	return {
		where: {
			roomId,
			actionId: { in: actionIds, },
			activistId: { in: activistIds, },
			createdAt: {
				gte: after,
				lte: before,
			},
			sphereId: {
				in: sphereIds,
			},
		},
		select: activitySelect,
		...pagination,
		orderBy: {
			[by]: type,
		},
	} satisfies Prisma.ActivityFindManyArgs;
};
