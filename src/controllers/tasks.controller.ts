import { RequestHandler } from "express";
import { TaskStatus, VerifyUserModel } from "../models";
import {
	ActivitiesServices,
	ApiError,
	ProgressServices,
	TasksService,
} from "../services";

export class TasksController {
	public static getTasks: RequestHandler = async (req, res, next) => {
		try {
			const user: VerifyUserModel = req.body.user;

			const tasks = await TasksService.getTasks(user.userId);

			res.json({ tasks });
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
			ActivitiesServices.newActivity(user.userId, "Task", "Created");
			ProgressServices.changeProgress(user.userId, newTask!.groupId);

			res.json({ task: newTask });
		} catch (e) {
			next(e);
		}
	};

	public static deleteTask: RequestHandler = async (req, res, next) => {
		try {
			const user = req.body.user;
			const { id } = req.params;

			if (!id) {
				throw ApiError.BadRequest("id must be provided");
			}
			const deletedTask = await TasksService.getTask(user.userId, +id);
			await TasksService.deleteTask(+id);

			ActivitiesServices.newActivity(user.userId, "Task", "Deleted");
			ProgressServices.changeProgress(user.userId, deletedTask!.groupId);
			res.json({ taskId: +id });
		} catch (e) {
			next(e);
		}
	};

	public static editTask: RequestHandler = async (req, res, next) => {
		try {
			const { content, groupId, status, user } = req.body;
			const { id } = req.params;

			if (!id) {
				throw ApiError.BadRequest("Id must be provided");
			}

			if (!["Done", "In Progress", "Ready", "Review"].includes(status)) {
				throw ApiError.BadRequest(
					"Status may be only Done, In Progress, Ready or Review"
				);
			}
			const oldTaskState = await TasksService.getTask(user.userId, +id);
			const task = await TasksService.editTask(+id, {
				content,
				groupId,
				status,
			});

			ActivitiesServices.newActivity(user.userId, "Task", "Edited");
			if (task?.groupId !== oldTaskState!.groupId) {
				ProgressServices.changeProgress(
					user.userId,
					task!.groupId,
					oldTaskState!.groupId
				);
			} else if (
				[task.status, oldTaskState!.status].includes(TaskStatus.DONE) &&
				task.status !== oldTaskState!.status
			) {
				ProgressServices.changeProgress(user.userId, task.groupId);
			}

			res.json({ task });
		} catch (e) {
			next(e);
		}
	};
}
