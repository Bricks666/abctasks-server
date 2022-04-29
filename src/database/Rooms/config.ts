import { RoomModel } from "@/models";
import { TableConfig } from "mariadb-table-wrapper";
import { USERS_TABLE } from "../Users";

export const ROOMS_TABLE = "rooms";

export const config: TableConfig<RoomModel> = {
	table: ROOMS_TABLE,
	fields: {
		roomId: {
			type: "SMALLINT",
			isPrimaryKey: true,
			isAutoIncrement: true,
			isUnsigned: true,
		},
		roomName: {
			type: "VARCHAR",
			isNotNull: true,
			default: "Room",
			stringLen: 32,
		},
		roomDescription: {
			type: "VARCHAR",
			isNotNull: true,
			default: "",
			stringLen: 32,
		},
		ownerId: {
			type: "SMALLINT",
			isUnsigned: true,
			isNotNull: true,
		},
	},
	foreignKeys: {
		ownerId: {
			field: "userId",
			tableName: USERS_TABLE,
		},
	},
	safeCreating: true,
};
