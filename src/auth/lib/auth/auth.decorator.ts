import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const Auth = () =>
	applyDecorators(
		ApiBearerAuth(),
		ApiUnauthorizedResponse({ description: 'Unauthorized', })
	);
