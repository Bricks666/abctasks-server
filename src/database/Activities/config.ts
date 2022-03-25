import { TableConfig } from "mariadb-table-wrapper";
import { ActivityModel } from "../../models";
import { ROOMS_TABLE } from "../Rooms";
import { USERS_TABLE } from "../Users";

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
		roomId: {
			type: "SMALLINT",
			isNotNull: true,
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
			tableName: USERS_TABLE,
			field: "userId",
		},
		roomId: {
			field: "roomId",
			tableName: ROOMS_TABLE,
		},
	},
	safeCreating: true,
};
