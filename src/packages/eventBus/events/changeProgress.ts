import * as base from "../base";

const CHANGE_PROGRESS = "events/CHANGE_PROGRESS";

export const subscribe = (callback: base.Listener) => {
	return base.subscribe(CHANGE_PROGRESS, callback);
};

export const broadcast = (userId: number, groupIds: number[]) => {
	return base.broadcast(CHANGE_PROGRESS, [userId, groupIds]);
};
