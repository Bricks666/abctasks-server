import { Table } from "mariadb-table-wrapper";
import { usersConfig } from "./config";

export const UsersTable = new Table(usersConfig);
