import { VerifyUserModel } from "../models";
import { RequestHandler } from "express";
import { ActivitiesServices } from "../services";
import { createEventResponse } from "../utils";

export class ActivitiesController {
	public static getActivities: RequestHandler = async (req, res, next) => {
		try {
			const user: VerifyUserModel = req.body.user;
			const activities = await ActivitiesServices.getActivities(user.userId);
			res.json({ activities });
		} catch (e) {
			next(e);
		}
	};

	static subscribeNewActivities: RequestHandler = async (req, res, next) => {
		try {
			res.writeHead(200, {
				Connection: "keep-alive",
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
			});
			const user: VerifyUserModel = req.body.user;
			const unsubscribe = ActivitiesServices.watchNewActivities(
				user.userId,
				(activity) => res.write(createEventResponse(activity))
			);

			res.once("close", unsubscribe);
			res.once("error", unsubscribe);
		} catch (e) {
			next(e);
		}
	};
}
