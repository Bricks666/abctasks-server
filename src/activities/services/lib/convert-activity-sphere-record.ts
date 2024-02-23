import { ActivitySphere } from '../../entities';
import { ActivitySphereRecord } from '../../repositories';

export const convertActivitySphereRecord = (
	record: ActivitySphereRecord
): ActivitySphere => {
	const { id, name, } = record;

	return {
		id,
		name,
	};
};
