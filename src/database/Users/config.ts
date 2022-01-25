import { SQLTypes, TableConfig } from "mariadb-table-wrapper";
import { UserModel } from "../../models";

export const USERS_TABLE = "users"

export const usersConfig: TableConfig<UserModel> = {
	table: USERS_TABLE,
	fields: {
		userId: {
			type: SQLTypes.SMALLINT,
			isAutoIncrement: true,
			isNotNull: true,
			isPrimaryKey: true,
			isUnsigned: true,
		},

		login: {
			type: SQLTypes.VARCHAR,
			isUnique: true,
			isNotNull: true,
			stringLen: 32,
		},
		password: {
			type: SQLTypes.VARCHAR,
			stringLen: 128,
			isNotNull: true,
		},
		photo: {
			type: SQLTypes.VARCHAR,
			stringLen: 128,
		},
	},
	safeCreating: true,
};
