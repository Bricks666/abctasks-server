import { HEX } from "../interfaces/common";

export interface TodoGroupModel {
	readonly groupId: number;
	readonly groupName: string;
	readonly groupMainColor: HEX;
	readonly groupSecondColor: HEX;
}
