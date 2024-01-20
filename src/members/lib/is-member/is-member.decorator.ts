import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse } from '@nestjs/swagger';
import { IsMemberGuard } from './is-member.guard';

export const IsMember = () =>
	applyDecorators(
		ApiForbiddenResponse({
			description: 'Пользователь не может совершать действия в данной комнате',
		}),
		UseGuards(IsMemberGuard)
	);
