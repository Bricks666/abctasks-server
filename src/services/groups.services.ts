import { TaskGroupsTable } from "../database";
import { HEX } from "../interfaces/common";
import { TaskGroupModel } from "../models";

export class GroupsServices {
	public static getTaskGroups = async (roomId: number) => {
		return await TaskGroupsTable.select({
			filters: { roomId: { operator: "=", value: roomId } },
			excludes: ["roomId"],
		});
	};
	public static addTaskGroup = async (
		roomId: number,
		name: string,
		mainColor: HEX,
		secondColor: HEX
	) => {
		await TaskGroupsTable.insert({
			groupMainColor: mainColor,
			groupName: name,
			groupSecondColor: secondColor,
			roomId: roomId,
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
				roomId: {
					operator: "=",
					value: roomId,
				},
			},
			orderBy: {
				groupId: "DESC",
			},
		});
	};
	public static deleteGroup = async (roomId: number, groupId: number) => {
		await TaskGroupsTable.delete({
			roomId: {
				operator: "=",
				value: roomId,
			},
			groupId: {
				operator: "=",
				value: groupId,
			},
		});
	};
	public static editGroup = async (
		roomId: number,
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
				roomId: {
					operator: "=",
					value: roomId,
				},
			}
		);
		return await TaskGroupsTable.selectOne({
			filters: {
				groupId: {
					operator: "=",
					value: groupId,
				},
				roomId: {
					operator: "=",
					value: roomId,
				},
			},
		});
	};
}
