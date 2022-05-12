import { Table } from "mariadb-table-wrapper";
import { config } from "./config";

export const roomsToUsersTable = new Table(config);
