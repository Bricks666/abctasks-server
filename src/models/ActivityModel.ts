export enum ActivityType {
	EDIT,
	CREATE,
	DELETE,
}
export enum ActivitySphere {
	TASK,
	GROUP,
}

export interface ActivityModel {
	readonly activityId: number;
	readonly roomId: number;
	readonly activitySphere: ActivitySphere;
	readonly activityType: ActivityType;
	readonly activistId: number;
	readonly date: string;
}
