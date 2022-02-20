import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./config";
import { appRoutes } from "./routes";
import { errorHandler } from "./middlewares";
import { createConnection } from "mariadb-table-wrapper";
import { TaskGroupsTable, TasksTable, UsersTable } from "./database";
import { ActivitiesTable } from "./database/Activities";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(json());
app.use("/", appRoutes);
app.use(errorHandler);

app.listen(PORT, async () => {
	const connection = await createConnection({
		user: "root",
		password: "Root123",
		initSql: ["CREATE DATABASE IF NOT EXISTS  Todo;", "use Todo;"],
		checkDuplicate: false,
	});

	const tables = [
		UsersTable.init(connection),
		TaskGroupsTable.init(connection),
		TasksTable.init(connection),
		ActivitiesTable.init(connection),
	];

	await Promise.all(tables);
});
