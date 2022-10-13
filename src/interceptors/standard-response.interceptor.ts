import {
	CallHandler,
	ExecutionContext,
	HttpException,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';
import {
	FailResponse,
	StandardResponse,
	SuccessResponse,
} from '@/types/standard-response';

@Injectable()
export class StandardResponseInterceptor<T>
	implements NestInterceptor<T, StandardResponse<T>>
{
	intercept(
		_: ExecutionContext,
		next: CallHandler
	): Observable<StandardResponse<T>> {
		return next.handle().pipe(
			map<T, SuccessResponse<T>>((data) => ({
				data,
				errorMessage: null,
				statusCode: 200,
			})),
			catchError((error: HttpException): Observable<FailResponse> => {
				console.log(error);
				return of({
					data: null,
					statusCode: error.getStatus ? error.getStatus() : 500,
					errorMessage: error.message,
				});
			})
		);
	}
}
