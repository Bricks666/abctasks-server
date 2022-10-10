import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
	// Type
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

// const PRIMITIVES: Type<unknown>[] = [String, Number, Boolean];

@Injectable()
export class ValidationPipe implements PipeTransform {
	async transform(value: unknown, metadata: ArgumentMetadata) {
		/* 		if (PRIMITIVES.includes(metadata.metatype!) || !value) {
			return value;
		} */
		const object = plainToClass(metadata.metatype!, value);
		const errors = await validate(object);
		if (errors.length) {
			const message = errors.reduce(
				(message, error) =>
					`${message} '${error.property}' ${error.children?.join(', ')}`,
				''
			);

			throw new BadRequestException(message);
		}

		return value;
	}
}
