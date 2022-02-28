import { TaskGroupsTable } from "../database";
import { HEX } from "../interfaces/common";

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
}
