import { RequestWithUser } from '@/interfaces/request';
import { RoomModel } from '@/models';

export interface RoomsResponse {
	readonly rooms: RoomModel[];
}
export interface RoomResponse {
	readonly room: RoomModel;
}
export interface RoomRequest extends RequestWithUser {
	readonly roomName: string;
	readonly roomDescription: string;
}
export interface RoomIdResponse {
	readonly roomId: string | number;
}
