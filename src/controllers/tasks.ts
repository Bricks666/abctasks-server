import { RequestHandler } from 'express';
import { ActivitySphere, ActivityType, TaskStatus } from '@/models';
import { ActivitiesServices, ProgressServices, TasksService } from '@/services';
import { RoomIdParam } from '@/interfaces/param';
import {
	DeleteTaskResponse,
	TaskParams,
	TaskRequest,
	TaskResponse,
	TasksResponse,
} from './tasks.types';
import { RequestWithUser } from '@/interfaces/request';

export class TasksController {
	public static getTasks: RequestHandler<
		RoomIdParam,
		TasksResponse,
		RequestWithUser
	> = async (req, res, next) => {
			try {
				const { roomId } = req.params;

				const tasks = await TasksService.getTasks(+roomId);

				res.json({ tasks });
			} catch (e) {
				next(e);
			}
		};

	public static createTask: RequestHandler<
		RoomIdParam,
		TaskResponse,
		TaskRequest
	> = async (req, res, next) => {
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

				res.json({ task: newTask! });
			} catch (e) {
				next(e);
			}
		};

	public static deleteTask: RequestHandler<
		TaskParams,
		DeleteTaskResponse,
		RequestWithUser
	> = async (req, res, next) => {
			try {
				const { user } = req.body;
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

	public static editTask: RequestHandler<
		TaskParams,
		TaskResponse,
		TaskRequest
	> = async (req, res, next) => {
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

				if (+task!.groupId !== oldTaskState!.groupId) {
					ProgressServices.changeProgress(
						user.userId,
					task!.groupId,
					oldTaskState!.groupId
					);
				} else if (
					[+task!.status, +oldTaskState!.status].includes(TaskStatus.DONE) &&
				+task!.status !== +oldTaskState!.status
				) {
					ProgressServices.changeProgress(+roomId, +task!.groupId);
				}

				res.json({ task: task! });
			} catch (e) {
				next(e);
			}
		};
}
