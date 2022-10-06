import { TableConfig } from 'mariadb-table-wrapper';
import { TaskModel, TaskStatus } from '@/models';
import { ROOMS_TABLE } from '../Rooms';
import { TASK_GROUPS_TABLE } from '../TaskGroups';
import { USERS_TABLE } from '../Users';

export const TASKS_TABLE = 'todos';

export const tasksConfig: TableConfig<TaskModel> = {
	table: TASKS_TABLE,
	fields: {
		todoId: {
			type: 'SMALLINT',
			isPrimaryKey: true,
			isAutoIncrement: true,
			isNotNull: true,
			isUnsigned: true,
		},
		status: {
			type: 'ENUM',
			isUnsigned: true,
			isNotNull: true,
			enumSetValues: [
				TaskStatus.DONE,
				TaskStatus.IN_PROGRESS,
				TaskStatus.READY,
				TaskStatus.REVIEW,
			],
		},
		roomId: {
			type: 'SMALLINT',
			isNotNull: true,
			isUnsigned: true,
		},
		groupId: {
			type: 'SMALLINT',
			isUnsigned: true,
			isNotNull: true,
		},
		authorId: {
			type: 'SMALLINT',
			isNotNull: true,
			isUnsigned: true,
		},
		content: {
			type: 'VARCHAR',
			stringLen: 128,
			isNotNull: true,
		},
		date: {
			type: 'DATETIME',
			isNotNull: true,
		},
	},
	safeCreating: true,
	foreignKeys: {
		groupId: {
			tableName: TASK_GROUPS_TABLE,
			field: 'groupId',
		},
		authorId: {
			tableName: USERS_TABLE,
			field: 'userId',
		},
		roomId: {
			tableName: ROOMS_TABLE,
			field: 'roomId',
		},
	},
};
