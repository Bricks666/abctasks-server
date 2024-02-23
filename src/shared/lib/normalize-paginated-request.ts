import { PaginatedRequestDto } from '../contracts';

export const normalizePaginatedRequest = (
	params: PaginatedRequestDto
): Required<PaginatedRequestDto> => {
	return {
		page: 1,
		count: 100,
		...params,
	};
};
