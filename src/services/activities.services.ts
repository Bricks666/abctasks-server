import { ActivityModel, ActivityType } from "../models";
import { ActivitiesTable } from "../database/Activities";
import { newActivity } from "../packages/eventBus";

export class ActivitiesServices {
	public static async getActivities(userId: number) {
		return await ActivitiesTable.select({
			filters: {
				activistId: userId,
			},
			orderBy: {
				activityId: "DESC",
			},
		});
	}

	public static async newActivity(userId: number, type: ActivityType) {
		await ActivitiesTable.insert({ activistId: userId, activityType: type });
		const newActivities = await ActivitiesTable.selectOne({
			filters: {
				activistId: userId,
				activityType: type,
			},
			orderBy: {
				activityId: "DESC",
			},
		});
		newActivity.broadcast(userId, newActivities);
	}

	public static watchNewActivities(
		_userId: number,
		listener: (activity: ActivityModel) => unknown
	) {
		return newActivity.subscribe((_user, activity) => {
			/* if (user === userId) { */
			listener(activity as ActivityModel);
			/* } */
		});
	}
}
