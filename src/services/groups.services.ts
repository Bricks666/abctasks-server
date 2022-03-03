import { TaskGroupsTable } from "../database";
import { HEX } from "../interfaces/common";
import { TaskGroupModel } from "../models";

export class GroupsServices {
	public static getTaskGroups = async (userId: number) => {
		return await TaskGroupsTable.select({
			filters: { ownerId: { operator: "=", value: userId } },
			excludes: ["ownerId"],
		});
	};
	public static addTaskGroup = async (
		userId: number,
		name: string,
		mainColor: HEX,
		secondColor: HEX
	) => {
		await TaskGroupsTable.insert({
			groupMainColor: mainColor,
			groupName: name,
			groupSecondColor: secondColor,
			ownerId: userId,
		});
		return await TaskGroupsTable.selectOne({
			filters: {
				groupMainColor: {
					operator: "=",
					value: mainColor,
				},
				groupSecondColor: {
					operator: "=",
					value: secondColor,
				},
				groupName: {
					operator: "=",
					value: name,
				},
				ownerId: {
					operator: "=",
					value: userId,
				},
			},
			orderBy: {
				groupId: "DESC",
			},
		});
	};
	public static deleteGroup = async (userId: number, groupId: number) => {
		await TaskGroupsTable.delete({
			ownerId: {
				operator: "=",
				value: userId,
			},
			groupId: {
				operator: "=",
				value: groupId,
			},
		});
	};
	public static editGroup = async (
		userId: number,
		groupId: number,
		mainColor: HEX,
		secondColor: HEX,
		name: string
	) => {
		await TaskGroupsTable.update<Partial<TaskGroupModel>>(
			{
				groupMainColor: mainColor,
				groupSecondColor: secondColor,
				groupName: name,
			},
			{
				groupId: {
					operator: "=",
					value: groupId,
				},
				ownerId: {
					operator: "=",
					value: userId,
				},
			}
		);
		return await TaskGroupsTable.selectOne({
			filters: {
				groupId: {
					operator: "=",
					value: groupId,
				},
				ownerId: {
					operator: "=",
					value: userId,
				},
			},
		});
	};
}
