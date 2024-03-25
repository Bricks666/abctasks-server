export const getUserRoomsCacheKey = (userId: number): string => {
	return `rooms_${userId}`;
};
