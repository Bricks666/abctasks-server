import { Table } from "mariadb-table-wrapper";
import { TaskModelShort } from "../../models";
import { tasksConfig } from "./config";

export const TasksTable = new Table<TaskModelShort>(tasksConfig);
