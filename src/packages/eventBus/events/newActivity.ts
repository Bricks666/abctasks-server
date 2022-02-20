import * as eventBus from "../base";

export const NEW_ACTIVITIES_EVENT = "NEW ACTIVITIES";

export const subscribe = (listener: eventBus.Listener) => {
	return eventBus.subscribe(NEW_ACTIVITIES_EVENT, listener);
};

export const broadcast = (...data: unknown[]) => {
	eventBus.broadcast(NEW_ACTIVITIES_EVENT, data);
};
