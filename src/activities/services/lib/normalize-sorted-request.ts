import { SortedRequestDto } from '@/shared';

export const normalizeSortedRequest = (
	sort: SortedRequestDto
): Required<SortedRequestDto> => {
	return {
		by: 'createdAt',
		type: 'desc',
		...sort,
	};
};
