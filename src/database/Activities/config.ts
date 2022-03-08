import { TableConfig } from "mariadb-table-wrapper";
import { ActivityModel } from "../../models";

export const ACTIVITIES_TABLE = "activities";

export const config: TableConfig<ActivityModel> = {
	table: ACTIVITIES_TABLE,
	fields: {
		activityId: {
			type: "SMALLINT",
			isAutoIncrement: true,
			isNotNull: true,
			isPrimaryKey: true,
			isUnsigned: true,
		},
		activitySphere: {
			type: "ENUM",
			isNotNull: true,
			enumSetValues: ["Group", "Task"],
		},
		activityType: {
			type: "ENUM",
			isNotNull: true,
			enumSetValues: ["Edited", "Created", "Deleted"],
		},
		activistId: {
			type: "SMALLINT",
			isNotNull: true,
			isUnsigned: true,
		},
		date: {
			type: "DATETIME",
			isNotNull: true,
		},
	},
	foreignKeys: {
		activistId: {
			tableName: "users",
			field: "userId",
		},
	},
	safeCreating: true,
};
