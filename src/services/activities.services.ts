import { ActivityModel, ActivitySphere, ActivityType } from "../models";
import { ActivitiesTable } from "../database/Activities";
import { newActivity } from "../packages/eventBus";
import { getSQLDatetime } from "../utils";

export class ActivitiesServices {
	public static async getActivities(userId: number) {
		return await ActivitiesTable.select({
			filters: {
				activistId: { operator: "=", value: userId },
			},
			joinedTable: {
				enable: true,
				joinTable: ["users"],
			},
			includes: {
				users: ["login"],
				activities: ["*"],
			},
			orderBy: {
				activityId: "DESC",
			},
		});
	}

	public static async newActivity(
		userId: number,
		sphere: ActivitySphere,
		type: ActivityType
	) {
		const date = getSQLDatetime();
		await ActivitiesTable.insert({
			activistId: userId,
			activitySphere: sphere,
			activityType: type,
			date,
		});
		const newActivities = await ActivitiesTable.selectOne<ActivityModel>({
			filters: {
				activistId: { operator: "=", value: userId },
				activityType: { operator: "=", value: type },
				activitySphere: { operator: "=", value: sphere },
			},
			joinedTable: {
				enable: true,
				joinTable: ["users"],
			},
			includes: {
				users: ["login"],
				activities: ["*"],
			},
			orderBy: {
				activityId: "DESC",
			},
		});
		newActivity.broadcast(userId, newActivities!);
	}

	public static watchNewActivities(
		userId: number,
		listener: (activity: ActivityModel) => unknown
	) {
		return newActivity.subscribe((user, activity) => {
			if (user === userId) {
				listener(activity as ActivityModel);
			}
		});
	}
}
