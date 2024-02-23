import { ActivityAction } from '../../entities';
import { ActivityActionRecord } from '../../repositories';

export const convertActivityActionRecord = (
	record: ActivityActionRecord
): ActivityAction => {
	const { id, name, } = record;

	return {
		id,
		name,
	};
};
