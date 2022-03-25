export type ActivityType = "Edited" | "Created" | "Deleted";
export type ActivitySphere = "Task" | "Group";

export interface ActivityModel {
	readonly activityId: number;
	readonly roomId: number;
	readonly activitySphere: ActivitySphere;
	readonly activityType: ActivityType;
	readonly activistId: number;
	readonly date: string;
}
