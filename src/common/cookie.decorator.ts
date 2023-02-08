import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Cookie = createParamDecorator<string, ExecutionContext>(
	(cookie, context) => {
		const req: Request = context.switchToHttp().getRequest();

		return req.cookies[cookie] ?? null;
	}
);
