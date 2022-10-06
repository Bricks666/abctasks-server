import { Table } from 'mariadb-table-wrapper';
import { TaskModel } from '../../models';
import { tasksConfig } from './config';

export const TasksTable = new Table<TaskModel>(tasksConfig);
