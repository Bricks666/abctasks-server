import { ActivityModel, ActivityType } from "../models";
import { ActivitiesTable } from "../database/Activities";
import { newActivity } from "../packages/eventBus";
import { getSQLDatetime } from "../utils";

export class ActivitiesServices {
	public static async getActivities(userId: number) {
		return await ActivitiesTable.select({
			filters: {
				activistId: { operator: "=", value: userId },
			},
			orderBy: {
				activityId: "DESC",
			},
		});
	}

	public static async newActivity(userId: number, type: ActivityType) {
		const addedAt = getSQLDatetime();
		await ActivitiesTable.insert({
			activistId: userId,
			activityType: type,
			addedAt,
		});
		const newActivities = await ActivitiesTable.selectOne({
			filters: {
				activistId: { operator: "=", value: userId },
				activityType: { operator: "=", value: type },
			},
			orderBy: {
				activityId: "DESC",
			},
		});
		newActivity.broadcast(userId, newActivities);
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
