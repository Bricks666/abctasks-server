export const createEventResponse = (data: unknown) => {
	return `data: ${JSON.stringify(data)}\n\n`;
};
