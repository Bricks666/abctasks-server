import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./config";
import { todoDB } from "./database";
import { appRoutes } from "./routes";
import { errorHandler } from "./middlewares";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(json());
app.use("/", appRoutes);
app.use(errorHandler);

app.listen(PORT, async () => {
	await todoDB.connect();
});
