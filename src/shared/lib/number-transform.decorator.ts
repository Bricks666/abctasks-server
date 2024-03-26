import { Transform } from 'class-transformer';

export interface NumberTransformParams {
	readonly defaultValue?: number | number[];
	readonly singleValueAsArray?: boolean;
}

export const NumberTransform = (params: NumberTransformParams = {}) => {
	const { defaultValue, singleValueAsArray = false, } = params;

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

		const multipleValues = numbers.length > 1;
		const singleArrayedValue = numbers.length === 1 && singleValueAsArray;

		if (multipleValues || singleArrayedValue) {
			return numbers.map(Number);
		}

		return Number(numbers[0]);
	});
};
