import { Prisma } from '@prisma/client';
import { GetAllActivitiesByRoomIdQuery } from '../contracts';

export const convertGetTotalCountByRoomIdQuery = (
	query: GetAllActivitiesByRoomIdQuery
) => {
	const { by, type, actionIds, activistIds, after, before, sphereIds, roomId, } =
		query;

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
		orderBy: {
			[by]: type,
		},
	} satisfies Prisma.ActivityCountArgs;
};
