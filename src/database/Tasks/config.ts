import { SQLTypes, TableConfig } from "mariadb-table-wrapper";
import { TaskModelShort, TaskStatus } from "../../models";
import { TASK_GROUPS_TABLE } from "../TaskGroups";
import { USERS_TABLE } from "../Users";

export const TASKS_TABLE = "todos";

export const tasksConfig: TableConfig<TaskModelShort> = {
	table: TASKS_TABLE,
	fields: {
		todoId: {
			type: SQLTypes.SMALLINT,
			isPrimaryKey: true,
			isAutoIncrement: true,
			isNotNull: true,
			isUnsigned: true,
		},
		status: {
			type: SQLTypes.ENUM,
			isUnsigned: true,
			isNotNull: true,
			enumSetValues: [
				TaskStatus.DONE,
				TaskStatus.IN_PROGRESS,
				TaskStatus.READY,
				TaskStatus.REVIEW,
			],
		},
		groupId: {
			type: SQLTypes.SMALLINT,
			isUnsigned: true,
			isNotNull: true,
		},
		authorId: {
			type: SQLTypes.SMALLINT,
			isNotNull: true,
			isUnsigned: true,
		},
		content: {
			type: SQLTypes.VARCHAR,
			stringLen: 128,
			isNotNull: true,
		},
		date: {
			type: SQLTypes.DATETIME,
			isNotNull: true,
		},
	},
	safeCreating: true,
	foreignKeys: {
		groupId: {
			tableName: TASK_GROUPS_TABLE,
			field: "groupId",
		},
		authorId: {
			tableName: USERS_TABLE,
			field: "userId",
		},
	},
};
