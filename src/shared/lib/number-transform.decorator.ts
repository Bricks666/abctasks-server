import { Transform } from 'class-transformer';

export const NumberTransform = () => {
	return Transform((property) => {
		if (Array.isArray(property.value)) {
			return property.value.map(Number);
		}

		return Number(property.value);
	});
};
