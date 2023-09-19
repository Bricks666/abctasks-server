export const map = <T extends Record<string, any>, K extends keyof T>(
	array: T[],
	key: K
): Record<T[K], T> => {
	return array.reduce((acc, item) => {
		acc[item[key]] = item;

		return acc;
	}, {} as Record<T[K], T>);
};

export const mapManual = <T extends Record<string, any>, V extends T[keyof T]>(
	array: T[],
	getter: (item: T) => V | V[]
): Record<V, T> => {
	return array.reduce((acc, item) => {
		const keyOrKeys = getter(item);

		if (Array.isArray(keyOrKeys)) {
			keyOrKeys.forEach((key) => {
				acc[key] = item;
			});

			return acc;
		}

		acc[keyOrKeys] = item;

		return acc;
	}, {} as Record<V, T>);
};
