import { RequestHandler } from "express";
import { ActivitySphere, ActivityType, TaskStatus } from "@/models";
import { ActivitiesServices, ProgressServices, TasksService } from "@/services";

export class TasksController {
	public static getTasks: RequestHandler = async (req, res, next) => {
		try {
			const { user } = req.body;
			const { roomId } = req.params;

			const tasks = await TasksService.getTasks(+roomId, user.userId);

			res.json({ tasks });
		} catch (e) {
			next(e);
		}
	};

	public static createTask: RequestHandler = async (req, res, next) => {
		try {
			const { content, status, groupId, user } = req.body;
			const { roomId } = req.params;
			const newTask = await TasksService.createTask(
				+roomId,
				user.userId,
				content,
				status,
				groupId
			);
			ActivitiesServices.newActivity(
				+roomId,
				user.userId,
				ActivitySphere.TASK,
				ActivityType.CREATE
			);
			ProgressServices.changeProgress(+roomId, newTask!.groupId);

			res.json({ task: newTask });
		} catch (e) {
			next(e);
		}
	};

	public static deleteTask: RequestHandler = async (req, res, next) => {
		try {
			const user = req.body.user;
			const { id, roomId } = req.params;

			const deletedTask = await TasksService.getTask(+roomId, +id);
			await TasksService.deleteTask(+roomId, +id);

			ActivitiesServices.newActivity(
				+roomId,
				user.userId,
				ActivitySphere.TASK,
				ActivityType.DELETE
			);
			ProgressServices.changeProgress(+roomId, deletedTask!.groupId);
			res.json({ taskId: +id, roomId: +roomId });
		} catch (e) {
			next(e);
		}
	};

	public static editTask: RequestHandler = async (req, res, next) => {
		try {
			const { content, groupId, status, user } = req.body;
			const { id, roomId } = req.params;

			const oldTaskState = await TasksService.getTask(+roomId, +id);
			const task = await TasksService.editTask(+roomId, +id, {
				content,
				groupId,
				status,
			});

			ActivitiesServices.newActivity(
				+roomId,
				user.userId,
				ActivitySphere.TASK,
				ActivityType.EDIT
			);
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
				ProgressServices.changeProgress(+roomId, task.groupId);
			}

			res.json({ task });
		} catch (e) {
			next(e);
		}
	};
}
