import { PaginationQueryDto } from '@/common';

export const normalizePaginationParams = (
	params: PaginationQueryDto
): Required<{ offset: number; limit: number }> => {
	return {
		limit: params.count ?? 100,
		offset: ((params.page ?? 1) - 1) * params.count,
	};
};
