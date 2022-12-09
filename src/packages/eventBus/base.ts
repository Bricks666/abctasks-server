export type Listener = (...args: unknown[]) => unknown;

const emitter: Record<string, Set<Listener>> = {};

export const subscribe = (eventName: string, listener: Listener) => {
	if (!emitter[eventName]) {
		emitter[eventName] = new Set<Listener>();
	}
	emitter[eventName].add(listener);
	return () => {
		emitter[eventName].delete(listener);
	};
};

export const broadcast = (eventName: string, data: unknown[]) => {
	emitter[eventName].forEach((listener) => listener(...data));
};
