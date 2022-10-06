import { TableConfig } from 'mariadb-table-wrapper';
import { UserModel } from '@/models';

export const USERS_TABLE = 'users';

export const usersConfig: TableConfig<UserModel> = {
	table: USERS_TABLE,
	fields: {
		userId: {
			type: 'SMALLINT',
			isAutoIncrement: true,
			isNotNull: true,
			isPrimaryKey: true,
			isUnsigned: true,
		},

		login: {
			type: 'VARCHAR',
			isUnique: true,
			isNotNull: true,
			stringLen: 32,
		},
		password: {
			type: 'VARCHAR',
			stringLen: 128,
			isNotNull: true,
		},
		photo: {
			type: 'VARCHAR',
			stringLen: 128,
		},
	},
	safeCreating: true,
};
