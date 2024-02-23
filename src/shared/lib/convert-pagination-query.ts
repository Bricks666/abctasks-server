import { PaginatedRequestDto } from '../contracts';

export const convertPaginationQuery = (
	pagination: Required<PaginatedRequestDto>
) => {
	const take = pagination.count;
	const skip = (pagination.page - 1) * take;

	return {
		take,
		skip,
	};
};
