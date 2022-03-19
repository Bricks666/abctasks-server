import { Table } from "mariadb-table-wrapper";
import { config } from "./config";

export const RoomsTable = new Table(config);
