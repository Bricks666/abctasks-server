import { Prisma } from '@prisma/client';
import { TestingActivityDto } from '../dto';
import { DEFAULT_ACTIVITY } from '../configs';

export const convertTestingActivityDtoToActivityData = (
	dto: TestingActivityDto
): Prisma.ActivityCreateInput => {
	const {
		action = DEFAULT_ACTIVITY.action,
		activist = DEFAULT_ACTIVITY.activist,
		createdAt = DEFAULT_ACTIVITY.createdAt,
		room = DEFAULT_ACTIVITY.room,
		sphere = DEFAULT_ACTIVITY.sphere,
	} = dto;

	return {
		action: {
			connectOrCreate: {
				where: {
					name: action,
				},
				create: {
					name: action,
				},
			},
		},
		sphere: {
			connectOrCreate: {
				where: {
					name: sphere,
				},
				create: {
					name: sphere,
				},
			},
		},
		room_user: {
			connectOrCreate: {
				create: {
					roomId: room.id,
					userId: activist.id,
				},
				where: {
					roomId_userId: {
						roomId: room.id,
						userId: activist.id,
					},
				},
			},
		},
		createdAt,
	};
};
