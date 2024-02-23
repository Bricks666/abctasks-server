import { Activity } from '../../entities';
import { ActivityRecord } from '../../repositories';

export const convertActivityRecord = (record: ActivityRecord): Activity => {
	const { room_user, ...rest } = record;

	return {
		...rest,
		activist: room_user.user,
	};
};
