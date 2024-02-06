import { Prisma } from '@prisma/client';
import { ActivitiesFiltersDto, ActivityDto } from '../../dto';
import { ActivityRecord } from './types';

export const prepareWhere = (
	filters: ActivitiesFiltersDto
): Prisma.ActivityWhereInput => {
	return {
		actionId: { in: filters.actionIds, },
		activistId: { in: filters.activistIds, },
		createdAt: {
			gte: filters.after,
			lte: filters.before,
		},
		sphereId: {
			in: filters.sphereIds,
		},
	};
};

export const convertActivityRecordToActivityDto = (
	record: ActivityRecord
): ActivityDto => {
	const { room_user, ...rest } = record;

	return {
		...rest,
		activist: room_user.user,
	};
};
