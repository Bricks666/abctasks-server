import { Table } from "mariadb-table-wrapper";
import { config } from "./config";

export const ActivitiesTable = new Table(config);
