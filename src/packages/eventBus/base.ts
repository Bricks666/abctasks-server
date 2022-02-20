import EventEmitter from "events";

export type Listener = (...args: unknown[]) => unknown;

const emitter = new EventEmitter();

export const subscribe = (eventName: string, listener: Listener) => {
	emitter.on(eventName, listener);

	return () => {
		emitter.removeListener(eventName, listener);
	};
};

export const broadcast = (eventName: string, data: unknown[]) => {
	emitter.emit(eventName, ...data);
};
