import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { SuccessResponse } from '../types';

@Injectable()
export class StandardResponseInterceptor<T>
implements NestInterceptor<T, SuccessResponse<T>>
{
	intercept(
		_: ExecutionContext,
		next: CallHandler
	): Observable<SuccessResponse<T>> {
		return next.handle().pipe(
			map<T, SuccessResponse<T>>((data) => ({
				data,
				statusCode: 200,
			}))
		);
	}
}
