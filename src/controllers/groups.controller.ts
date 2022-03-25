import { RequestHandler } from "express";
import { ActivitiesServices, GroupsServices } from "../services";

export class GroupsControllers {
	public static getTaskGroups: RequestHandler = async (req, res, next) => {
		try {
			const { roomId } = req.params;
			const groups = await GroupsServices.getTaskGroups(+roomId);

			res.json({ groups });
		} catch (e) {
			next(e);
		}
	};
	public static createTaskGroup: RequestHandler = async (req, res, next) => {
		try {
			const { name, mainColor, secondColor, user } = req.body;
			const { roomId } = req.params;
			const group = await GroupsServices.addTaskGroup(
				+roomId,
				name,
				mainColor,
				secondColor
			);

			ActivitiesServices.newActivity(+roomId, user.userId, "Group", "Created");

			return res.json({ group });
		} catch (e) {
			next(e);
		}
	};

	public static deleteGroup: RequestHandler = async (req, res, next) => {
		try {
			const { user } = req.body;
			const { id, roomId } = req.params;
			await GroupsServices.deleteGroup(+roomId, +id);
			ActivitiesServices.newActivity(+roomId, user.userId, "Group", "Deleted");
			res.json({ groupId: +id });
		} catch (e) {
			next(e);
		}
	};
	public static editGroup: RequestHandler = async (req, res, next) => {
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
			ActivitiesServices.newActivity(+roomId, user.userId, "Group", "Edited");
			res.json({ group });
		} catch (e) {
			next(e);
		}
	};
}
