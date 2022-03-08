import { ActivityModel } from "@/src/models";
import * as eventBus from "../base";

export const NEW_ACTIVITIES_EVENT = "NEW ACTIVITIES";

export const subscribe = (listener: eventBus.Listener) => {
	return eventBus.subscribe(NEW_ACTIVITIES_EVENT, listener);
};

export const broadcast = (userId: number, activity: ActivityModel) => {
	eventBus.broadcast(NEW_ACTIVITIES_EVENT, [userId, activity]);
};
