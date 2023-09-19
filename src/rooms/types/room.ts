import { RoomDto } from '../dto';

export type WithRights<R extends RoomDto> = R & {
	readonly canChange: boolean;
};
