import { Table } from 'mariadb-table-wrapper';
import { ActivityModel } from '@/models';
import { config } from './config';

export const ActivitiesTable = new Table<ActivityModel>(config);
