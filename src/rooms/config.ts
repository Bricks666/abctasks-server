export const getLinkRedisKey = (id: number): string => {
	return `room-link:${id}`;
};
