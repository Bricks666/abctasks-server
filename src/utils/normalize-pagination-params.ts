import { PaginationQueryDto } from '@/common';

export interface Pagination {
	readonly offset: number;
	readonly limit: number;
}

export const normalizePaginationParams = (
	params: PaginationQueryDto
): Required<Pagination> => {
	return {
		limit: params.count ?? 100,
		offset: ((params.page ?? 1) - 1) * params.count,
	};
};
