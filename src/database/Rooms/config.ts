import { RoomModel } from '@/models';
import { TableConfig } from 'mariadb-table-wrapper';

export const ROOMS_TABLE = 'rooms';

export const config: TableConfig<RoomModel> = {
	table: ROOMS_TABLE,
	fields: {
		roomId: {
			type: 'SMALLINT',
			isPrimaryKey: true,
			isAutoIncrement: true,
			isUnsigned: true,
		},
		roomName: {
			type: 'VARCHAR',
			isNotNull: true,
			stringLen: 32,
		},
		roomDescription: {
			type: 'VARCHAR',
			isNotNull: true,
			default: '',
			stringLen: 32,
		},
	},
	safeCreating: true,
};
