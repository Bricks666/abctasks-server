export interface GroupTotalTask {
	readonly groupId: number;
	readonly totalCount: number;
}

export interface GroupDoneTask {
	readonly groupId: number;
	readonly doneCount: number;
}

export type TaskProgress = GroupDoneTask & GroupTotalTask;
