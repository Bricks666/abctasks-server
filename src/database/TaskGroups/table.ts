import { Table } from 'mariadb-table-wrapper';
import { TaskGroupModel } from '@/models';
import { taskGroupsConfig } from './config';

export const TaskGroupsTable = new Table<TaskGroupModel>(taskGroupsConfig);
