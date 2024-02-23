import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationResponseDto } from '../contracts';

export const ApiPaginatedResponse = <TModel extends Type<unknown>>(
	model: TModel
) => {
	return applyDecorators(
		ApiOkResponse({
			schema: {
				allOf: [
					{ $ref: getSchemaPath(PaginationResponseDto), },
					{
						properties: {
							items: {
								type: 'array',
								items: { $ref: getSchemaPath(model), },
							},
						},
						type: 'object',
					}
				],
			},
		})
	);
};
