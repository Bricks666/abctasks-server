export interface TodoStatusModel {
	readonly statusId: number;
	readonly statusName: string;
}

export enum TodoStatus {
	DONE = "Done",
	IN_PROGRESS = "In Progress",
	REVIEW = "Review",
	READY = "Ready",
}
