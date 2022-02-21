export type ActivityType = "Editing" | "Creating" | "Deleting";

export interface ActivityModel {
	readonly activityId: number;
	readonly activityType: ActivityType;
	readonly activistId: number;
	readonly addedAt: string;
}
