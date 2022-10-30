export const rooms = {
	room: (roomId: number | string) => `room-${roomId}`,
};

export const queries = {
	roomId: 'roomId',
	taskId: 'taskId',
};

export const events = {
	roomCreated: 'room-created',
	roomUpdated: 'room-updated',
	roomRemoved: 'room-removed',
};
