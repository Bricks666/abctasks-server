import { toJSON } from 'mariadb-table-wrapper';
import { ActivityModel, ActivitySphere, ActivityType } from '@/models';
import { ActivitiesTable, USERS_TABLE } from '@/database';
import { newActivity } from '@/packages/eventBus';
import { getSQLDatetime } from '@/utils';

export class ActivitiesServices {
	public static async getActivities(roomId: number) {
		return ActivitiesTable.select({
			filters: {
				roomId: { operator: '=', value: roomId },
			},
			joinedTable: {
				enable: true,
				joinTable: [USERS_TABLE],
			},
			includes: {
				users: ['login'],
				activities: ['*'],
			},
			orderBy: {
				activityId: 'DESC',
			},
		});
	}

	public static async newActivity(
		roomId: number,
		userId: number,
		sphere: ActivitySphere,
		type: ActivityType
	) {
		const date = getSQLDatetime();
		await ActivitiesTable.insert({
			activistId: userId,
			roomId,
			activitySphere: toJSON(sphere),
			activityType: toJSON(type),
			date,
		} as unknown as Partial<ActivityModel>);
		const newActivities = await ActivitiesTable.selectOne<ActivityModel>({
			filters: {
				activistId: { operator: '=', value: userId },
				roomId: { operator: '=', value: roomId },
				activityType: { operator: '=', value: toJSON(type) },
				activitySphere: { operator: '=', value: toJSON(sphere) },
			},
			joinedTable: {
				enable: true,
				joinTable: [USERS_TABLE],
			},
			includes: {
				users: ['login'],
				activities: ['*'],
			},
			orderBy: {
				activityId: 'DESC',
			},
		});
		newActivity.broadcast(roomId, newActivities!);
	}

	public static watchNewActivities(
		roomId: number,

		listener: (activity: ActivityModel) => unknown
	) {
		return newActivity.subscribe((room, activity) => {
			if (room === roomId) {
				listener(activity as ActivityModel);
			}
		});
	}
}
