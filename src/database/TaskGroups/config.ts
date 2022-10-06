import { TableConfig } from 'mariadb-table-wrapper';
import { TaskGroupModel } from '@/models';
import { ROOMS_TABLE } from '../Rooms';

export const TASK_GROUPS_TABLE = 'todoGroups';

export const taskGroupsConfig: TableConfig<TaskGroupModel> = {
	table: TASK_GROUPS_TABLE,
	fields: {
		groupId: {
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
		groupName: {
			type: 'VARCHAR',
			isNotNull: true,
			stringLen: 32,
		},
		groupMainColor: {
			type: 'VARCHAR',
			isNotNull: true,
			stringLen: 9,
		},
		groupSecondColor: {
			type: 'VARCHAR',
			isNotNull: true,
			stringLen: 9,
		},
	},
	safeCreating: true,
	foreignKeys: {
		roomId: {
			tableName: ROOMS_TABLE,
			field: 'roomId',
		},
	},
};
