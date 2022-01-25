import { RequestHandler } from "express";
import { VerifyUserModel } from "../models";
import { ApiError, TasksService } from "../services";

export class TasksController {
	public static getTasks: RequestHandler = async (req, res, next) => {
		try {
			const user: VerifyUserModel = req.body.user;
			if (!user) {
				throw ApiError.BadRequest("User must be Provided");
			}
			const tasks = await TasksService.getTasks(user.userId);

			res.json({ tasks });
		} catch (e) {
			next(e);
		}
	};

	public static getTasksProgress: RequestHandler = async (req, res, next) => {
		try {
			const user: VerifyUserModel = req.body.user;

			if (!user) {
				throw ApiError.BadRequest("User must be provided");
			}

			const tasksProgress = await TasksService.getTasksProgress(user.userId);

			res.json({ tasksProgress });
		} catch (e) {
			next(e);
		}
	};
	public static getTaskGroups: RequestHandler = async (req, res, next) => {
		try {
			const user: VerifyUserModel = req.body.user;

			if (!user) {
				ApiError.BadRequest("User must be provided");
			}

			const groups = await TasksService.getTaskGroups(user.userId);

			res.json({ groups });
		} catch (e) {
			next(e);
		}
	};
	public static createTask: RequestHandler = async (req, res, next) => {
		try {
			const user: VerifyUserModel = req.body.user;

			if (!user) {
				throw ApiError.BadRequest("User must be provided");
			}

			const { content, status, groupId } = req.body;

			if (!content || !status || !groupId) {
				throw ApiError.BadRequest(
					"Content, status and groupId must be provided"
				);
			}

			if (!["Done", "In Progress", "Ready", "Review"].includes(status)) {
				throw ApiError.BadRequest(
					"Status may be only Done, In Progress, Ready or Review"
				);
			}

			const newTask = await TasksService.createTask(
				user.userId,
				content,
				status,
				groupId
			);

			res.json({ task: newTask });
		} catch (e) {
			next(e);
		}
	};
}
