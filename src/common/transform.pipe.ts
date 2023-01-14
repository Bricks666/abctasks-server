import {
	ArgumentMetadata,
	Injectable,
	PipeTransform,
	Type
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

const PRIMITIVES: Type<unknown>[] = [String, Number, Boolean];

@Injectable()
export class TransformPipe implements PipeTransform {
	transform(value: unknown, metadata: ArgumentMetadata) {
		if (PRIMITIVES.includes(metadata.metatype!) || !value) {
			return value;
		}
		return plainToClass(metadata.metatype!, value);
	}
}
