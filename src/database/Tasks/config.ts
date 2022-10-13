import { TableConfig } from 'mariadb-table-wrapper';

export const TASKS_TABLE = 'todos';

export const tasksConfig: TableConfig<any> = {
	table: TASKS_TABLE,
	fields: {
		todoId: {
			type: 'SMALLINT',
			isPrimaryKey: true,
			isAutoIncrement: true,
			isNotNull: true,
			isUnsigned: true,
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
};
