import { RequestHandler } from "express";
import { VerifyUserModel } from "../models";
import { ActivitiesServices, GroupsServices } from "../services";

export class GroupsControllers {
	public static getTaskGroups: RequestHandler = async (req, res, next) => {
		try {
			const user: VerifyUserModel = req.body.user;

			const groups = await GroupsServices.getTaskGroups(user.userId);

			res.json({ groups });
		} catch (e) {
			next(e);
		}
	};
	public static createTaskGroup: RequestHandler = async (req, res, next) => {
		try {
			const user: VerifyUserModel = req.body.user;
			const { name, mainColor, secondColor } = req.body;
			const group = await GroupsServices.addTaskGroup(
				user.userId,
				name,
				mainColor,
				secondColor
			);

			ActivitiesServices.newActivity(user.userId, "Group", "Created");

			return res.json({ group });
		} catch (e) {
			next(e);
		}
	};

	public static deleteGroup: RequestHandler = async (req, res, next) => {
		try {
			const user: VerifyUserModel = req.body.user;
			const { id } = req.params;
			await GroupsServices.deleteGroup(user.userId, +id);
			ActivitiesServices.newActivity(user.userId, "Group", "Deleted");
			res.json({ groupId: +id });
		} catch (e) {
			next(e);
		}
	};
	public static editGroup: RequestHandler = async (req, res, next) => {
		try {
			const user: VerifyUserModel = req.body.user;
			const { id } = req.params;
			const { mainColor, secondColor, name } = req.body;
			const group = await GroupsServices.editGroup(
				user.userId,
				+id,
				mainColor,
				secondColor,
				name
			);
			ActivitiesServices.newActivity(user.userId, "Group", "Edited");
			res.json({ group });
		} catch (e) {
			next(e);
		}
	};
}
