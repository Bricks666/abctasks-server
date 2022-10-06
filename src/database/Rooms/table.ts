import { Table } from 'mariadb-table-wrapper';
import { RoomModel } from '@/models';
import { config } from './config';

export const RoomsTable = new Table<RoomModel>(config);
