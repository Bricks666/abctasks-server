import { ActivityModel } from "@/models";

export interface ActivitiesParams {
	readonly roomId: string;
}

export interface ActivitiesResponse {
	readonly activities: ActivityModel[];
}
