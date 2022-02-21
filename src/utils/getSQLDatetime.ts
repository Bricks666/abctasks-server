export const getSQLDatetime = (date?: Date) => {
	return (date || new Date()).toISOString().slice(0, -5);
};
