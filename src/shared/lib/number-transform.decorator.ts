import { Transform } from 'class-transformer';

export const NumberTransform = (defaultValue?: number[] | number) => {
	return Transform((property) => {
		const { value, } = property;

		if (typeof value !== 'string' && !Array.isArray(value)) {
			return value;
		}

		if (!value) {
			return defaultValue;
		}

		if (Array.isArray(value)) {
			return value.map(Number);
		}

		const numbers = value.split(',');

		if (numbers.length > 1) {
			return numbers.map(Number);
		}

		return Number(numbers[0]);
	});
};
