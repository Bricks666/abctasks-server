import { PaginationQueryDto } from '@/common';

export interface Pagination {
	readonly offset: number;
	readonly limit: number;
}

export const normalizePaginationParams = (
	params: PaginationQueryDto
): Required<Pagination> => {
	const limit = params.count ?? 50;
	const offset = ((params.page ?? 1) - 1) * limit;
	return {
		limit,
		offset,
	};
};
