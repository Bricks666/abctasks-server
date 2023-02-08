import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator<any, ExecutionContext>(
	(_, context) => {
		const req: Request = context.switchToHttp().getRequest();

		return (req as any).user ?? null;
	}
);
