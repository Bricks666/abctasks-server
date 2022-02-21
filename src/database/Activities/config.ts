import { ActivityModel } from "../../models";
import { SQLTypes, TableConfig } from "mariadb-table-wrapper";

export const ACTIVITIES_TABLE = "activities";

export const config: TableConfig<ActivityModel> = {
	table: ACTIVITIES_TABLE,
	fields: {
		activityId: {
			type: SQLTypes.SMALLINT,
			isAutoIncrement: true,
			isNotNull: true,
			isPrimaryKey: true,
			isUnsigned: true,
		},
		activityType: {
			type: SQLTypes.ENUM,
			isNotNull: true,
			enumSetValues: ["Editing", "Creating", "Deleting"],
		},
		activistId: {
			type: SQLTypes.SMALLINT,
			isNotNull: true,
			isUnsigned: true,
		},
		addedAt: {
			type: SQLTypes.DATETIME,
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
