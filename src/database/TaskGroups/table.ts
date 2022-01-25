import { Table } from "mariadb-table-wrapper";
import { taskGroupsConfig } from "./config";

export const TaskGroupsTable = new Table(taskGroupsConfig);
