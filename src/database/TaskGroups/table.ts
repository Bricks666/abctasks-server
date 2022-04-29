import { TaskGroupModel } from "@/models";
import { Table } from "mariadb-table-wrapper";
import { taskGroupsConfig } from "./config";

export const TaskGroupsTable = new Table<TaskGroupModel>(taskGroupsConfig);
