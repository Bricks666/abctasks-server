import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationResponseDto } from './pagination-response.dto';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
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
					}
				],
			},
		})
	);
};
