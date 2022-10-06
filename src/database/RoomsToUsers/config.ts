import { TableConfig } from 'mariadb-table-wrapper';
import { RoomToUsersModel } from '@/models';
import { ROOMS_TABLE } from '../Rooms';
import { USERS_TABLE } from '../Users';

export const ROOMS_TO_USERS_TABLE = 'roomsToUsers';

export const config: TableConfig<RoomToUsersModel> = {
	table: ROOMS_TO_USERS_TABLE,
	fields: {
		roomId: {
			type: 'SMALLINT',
			isPrimaryKey: true,
			isUnsigned: true,
		},
		userId: {
			type: 'SMALLINT',
			isPrimaryKey: true,
			isUnsigned: true,
		},
	},
	foreignKeys: {
		userId: {
			field: 'userId',
			tableName: USERS_TABLE,
		},
		roomId: {
			field: 'roomId',
			tableName: ROOMS_TABLE,
		},
	},
	safeCreating: true,
};
