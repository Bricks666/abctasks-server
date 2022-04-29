import { HEX } from "@/interfaces/common";
import { RequestWithUser } from "@/interfaces/request";
import { TaskGroupModel } from "@/models";

export interface GroupParams {
	readonly roomId: string;
}

export interface ChangeGroupParams extends GroupParams {
	readonly id: string;
}

export interface GroupsRequest extends RequestWithUser {
	readonly name: string;
	readonly mainColor: HEX;
	readonly secondColor: HEX;
}

export interface GroupResponse {
	readonly group: TaskGroupModel;
}

export interface GroupsResponse {
	readonly groups: TaskGroupModel[];
}

export interface GroupIdResponse {
	readonly groupId: number;
}
