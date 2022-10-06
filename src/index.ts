import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { DOMAIN, PATHS, PORT } from './config';
import { appRoutes } from './routes';
import { errorHandler } from './middlewares';
import { createConnection } from 'mariadb-table-wrapper';
import {
	TaskGroupsTable,
	TasksTable,
	UsersTable,
	RoomsTable,
	ActivitiesTable,
	roomsToUsersTable,
} from './database';
import { join } from 'path';

const app = express();

app.use(
	cors({
		origin: /^http:\/\/192.168.[\d]{1,3}.[\d]{1,3}:?[\d]{4}$/,
		credentials: true,
	})
);
app.use(cookieParser());
app.use(json());
app.use('/', appRoutes);
app.use('/static', express.static(join(__dirname, PATHS.AVATARS)));
app.use(errorHandler);

app.listen(PORT, DOMAIN, async () => {
	const connection = await createConnection({
		user: 'root',
		password: 'Root123',
		initSql: ['CREATE DATABASE IF NOT EXISTS  Todo;', 'use Todo;'],
		checkDuplicate: false,
	});

	const tables = [
		UsersTable.init(connection),
		RoomsTable.init(connection),
		TaskGroupsTable.init(connection),
		TasksTable.init(connection),
		ActivitiesTable.init(connection),
		RoomsTable.init(connection),
		roomsToUsersTable.init(connection),
	];
	await Promise.all(tables);
});
