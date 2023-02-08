import { Request } from 'express';
import {
	createParamDecorator,
	ExecutionContext,
	UnauthorizedException
} from '@nestjs/common';
import { extractAccessToken } from '@/lib';

export const AuthToken = createParamDecorator<unknown, ExecutionContext>(
	(_, context): string => {
		const req = context.switchToHttp().getRequest() as Request;
		const tokens = extractAccessToken(req);
		if (!tokens) {
			throw new UnauthorizedException('Token was not found');
		}

		return tokens[1];
	}
);
