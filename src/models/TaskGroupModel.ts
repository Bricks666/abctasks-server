import { HEX } from "../interfaces/common";

export interface TaskGroupModel {
	readonly groupId: number;
	readonly roomId: number;
	readonly groupName: string;
	readonly groupMainColor: HEX;
	readonly groupSecondColor: HEX;
}
