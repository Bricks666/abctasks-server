import { RequestHandler } from "express";
import { createEventResponse } from "../utils";
import { ProgressServices } from "./../services/progress.services";

export class ProgressControllers {
	public static getTasksProgress: RequestHandler = async (req, res, next) => {
		try {
			const { roomId } = req.params;

			const tasksProgress = await ProgressServices.getTasksProgress(+roomId);

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
			const { roomId } = req.params;
			const unsubscribe = ProgressServices.subscribeChangeProgress(
				+roomId,
				(progress) => res.write(createEventResponse(progress))
			);
			res.once("close", unsubscribe);
			res.once("error", unsubscribe);
		} catch (e) {
			next(e);
		}
	};
}
