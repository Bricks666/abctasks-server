import { RequestHandler } from "express";
import { ActivitiesServices, GroupsServices } from "@/services";
import { ActivitySphere, ActivityType } from "@/models";
import {
	ChangeGroupParams,
	GroupIdResponse,
	GroupParams,
	GroupResponse,
	GroupsRequest,
	GroupsResponse,
} from "./groups.types";
import { RequestWithUser } from "@/interfaces/request";

export class GroupsControllers {
	public static getTaskGroups: RequestHandler<GroupParams, GroupsResponse> =
		async (req, res, next) => {
			try {
				const { roomId } = req.params;
				const groups = await GroupsServices.getTaskGroups(+roomId);

				res.json({ groups });
			} catch (e) {
				next(e);
			}
		};
	public static createTaskGroup: RequestHandler<
		GroupParams,
		GroupResponse,
		GroupsRequest
	> = async (req, res, next) => {
			try {
				const { name, mainColor, secondColor, user } = req.body;
				const { roomId } = req.params;
				const group = await GroupsServices.addTaskGroup(
					+roomId,
					name,
					mainColor,
					secondColor
				);

				ActivitiesServices.newActivity(
					+roomId,
					user.userId,
					ActivitySphere.GROUP,
					ActivityType.CREATE
				);

				return res.json({ group: group! });
			} catch (e) {
				next(e);
			}
		};

	public static deleteGroup: RequestHandler<
		ChangeGroupParams,
		GroupIdResponse,
		RequestWithUser
	> = async (req, res, next) => {
			try {
				const { user } = req.body;
				const { id, roomId } = req.params;
				await GroupsServices.deleteGroup(+roomId, +id);
				ActivitiesServices.newActivity(
					+roomId,
					user.userId,
					ActivitySphere.GROUP,
					ActivityType.DELETE
				);
				res.json({ groupId: +id });
			} catch (e) {
				next(e);
			}
		};
	public static editGroup: RequestHandler<
		ChangeGroupParams,
		GroupResponse,
		GroupsRequest
	> = async (req, res, next) => {
			try {
				const { id, roomId } = req.params;
				const { mainColor, secondColor, name, user } = req.body;
				const group = await GroupsServices.editGroup(
					+roomId,
					+id,
					mainColor,
					secondColor,
					name
				);
				ActivitiesServices.newActivity(
					+roomId,
					user.userId,
					ActivitySphere.GROUP,
					ActivityType.EDIT
				);
				res.json({ group: group! });
			} catch (e) {
				next(e);
			}
		};
}
