import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@/auth/auth.guard';

export const Auth = () =>
	applyDecorators(
		UseGuards(AuthGuard),
		ApiBearerAuth(),
		ApiUnauthorizedResponse({ description: 'Unauthorized' })
	);
