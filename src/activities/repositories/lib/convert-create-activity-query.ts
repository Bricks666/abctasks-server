import { Prisma } from '@prisma/client';
import { CreateActivityQuery } from '../contracts';
import { activitySelect } from '../config';

export const convertCreateActivityQuery = (query: CreateActivityQuery) => {
	const { action, activistId, roomId, sphere, } = query;

	return {
		select: activitySelect,
		data: {
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
					create: {
						name: sphere,
					},
					where: {
						name: sphere,
					},
				},
			},
			room_user: {
				connect: {
					roomId_userId: {
						roomId,
						userId: activistId,
					},
				},
			},
		},
	} satisfies Prisma.ActivityCreateArgs;
};
