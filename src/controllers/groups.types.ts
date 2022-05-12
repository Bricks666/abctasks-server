import { HEX } from "@/interfaces/common";
import { RequestWithUser } from "@/interfaces/request";
import { RoomIdParam } from "@/interfaces/param";
import { TaskGroupModel } from "@/models";

export interface ChangeGroupParams extends RoomIdParam {
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
