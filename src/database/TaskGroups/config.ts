import { SQLTypes, TableConfig } from "mariadb-table-wrapper";
import { TaskGroupModel } from "../../models";

export const TASK_GROUPS_TABLE = "todoGroups";

export const taskGroupsConfig: TableConfig<TaskGroupModel> = {
	table: TASK_GROUPS_TABLE,
	fields: {
		groupId: {
			type: SQLTypes.SMALLINT,
			isAutoIncrement: true,
			isNotNull: true,
			isPrimaryKey: true,
			isUnsigned: true,
		},
		groupName: {
			type: SQLTypes.VARCHAR,
			isNotNull: true,
			stringLen: 32,
		},
		groupMainColor: {
			type: SQLTypes.VARCHAR,
			isNotNull: true,
			stringLen: 9,
		},
		groupSecondColor: {
			type: SQLTypes.VARCHAR,
			isNotNull: true,
			stringLen: 9,
		},
	},
	safeCreating: true,
};
