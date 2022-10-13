import { Table } from 'mariadb-table-wrapper';
import { tasksConfig } from './config';

export const TasksTable = new Table<any>(tasksConfig);
