import { TableConfig } from "mariadb-table-wrapper";
import { TaskGroupModel } from "../../models";

export const TASK_GROUPS_TABLE = "todoGroups";

export const taskGroupsConfig: TableConfig<TaskGroupModel> = {
	table: TASK_GROUPS_TABLE,
	fields: {
		groupId: {
			type: "SMALLINT",
			isAutoIncrement: true,
			isNotNull: true,
			isPrimaryKey: true,
			isUnsigned: true,
		},
		groupName: {
			type: "VARCHAR",
			isNotNull: true,
			stringLen: 32,
		},
		groupMainColor: {
			type: "VARCHAR",
			isNotNull: true,
			stringLen: 9,
		},
		groupSecondColor: {
			type: "VARCHAR",
			isNotNull: true,
			stringLen: 9,
		},
		ownerId: {
			type: "SMALLINT",
			isNotNull: true,
			isUnsigned: true,
		},
	},
	safeCreating: true,
	foreignKeys: {
		ownerId: {
			field: "userId",
			tableName: "users",
		},
	},
};
