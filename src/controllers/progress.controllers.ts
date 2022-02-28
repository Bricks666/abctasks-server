import { RequestHandler } from "express";
import { VerifyUserModel } from "../models";
import { createEventResponse } from "../utils";
import { ProgressServices } from "./../services/progress.services";

export class ProgressControllers {
	public static getTasksProgress: RequestHandler = async (req, res, next) => {
		try {
			const user: VerifyUserModel = req.body.user;

			const tasksProgress = await ProgressServices.getTasksProgress(
				user.userId
			);

			res.json({ tasksProgress });
		} catch (e) {
			next(e);
		}
	};
	public static subscribeChangeProgress: RequestHandler = async (
		req,
		res,
		next
	) => {
		try {
			res.writeHead(200, {
				Connection: "keep-alive",
				"Content-Type": "text/event-stream",
				"Change-Control": "no-cache",
			});
			const user: VerifyUserModel = req.body.user;
			const unsubscribe = ProgressServices.subscribeChangeProgress(
				user.userId,
				(progress) => res.write(createEventResponse(progress))
			);
			res.once("close", unsubscribe);
			res.once("error", unsubscribe);
		} catch (e) {
			next(e);
		}
	};
}
