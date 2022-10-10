import {
	CallHandler,
	ExecutionContext,
	HttpException,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, of } from 'rxjs';
import { FailResponse } from '@/types/standard-response';

@Injectable()
export class ErrorHandlerInterceptor<E extends HttpException>
	implements NestInterceptor<E, FailResponse>
{
	intercept(_: ExecutionContext, next: CallHandler): Observable<FailResponse> {
		return next.handle().pipe(
			catchError(
				(error: E): Observable<FailResponse> =>
					of({
						data: null,
						statusCode: error.getStatus(),
						errorMessage: error.message,
					})
			)
		);
	}
}
