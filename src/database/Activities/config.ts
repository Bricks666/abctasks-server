import { TableConfig } from 'mariadb-table-wrapper';
import { ActivityModel, ActivitySphere, ActivityType } from '@/models';
import { ROOMS_TABLE } from '../Rooms';
import { USERS_TABLE } from '../Users';

export const ACTIVITIES_TABLE = 'activities';

export const config: TableConfig<ActivityModel> = {
	table: ACTIVITIES_TABLE,
	fields: {
		activityId: {
			type: 'SMALLINT',
			isAutoIncrement: true,
			isNotNull: true,
			isPrimaryKey: true,
			isUnsigned: true,
		},
		roomId: {
			type: 'SMALLINT',
			isNotNull: true,
			isUnsigned: true,
		},
		activitySphere: {
			type: 'ENUM',
			isNotNull: true,
			enumSetValues: [ActivitySphere.GROUP, ActivitySphere.TASK],
		},
		activityType: {
			type: 'ENUM',
			isNotNull: true,
			enumSetValues: [
				ActivityType.CREATE,
				ActivityType.DELETE,
				ActivityType.EDIT,
			],
		},
		activistId: {
			type: 'SMALLINT',
			isNotNull: true,
			isUnsigned: true,
		},
		date: {
			type: 'DATETIME',
			isNotNull: true,
		},
	},
	foreignKeys: {
		activistId: {
			tableName: USERS_TABLE,
			field: 'userId',
		},
		roomId: {
			field: 'roomId',
			tableName: ROOMS_TABLE,
		},
	},
	safeCreating: true,
};
