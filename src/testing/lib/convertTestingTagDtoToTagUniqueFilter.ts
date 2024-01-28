import { Prisma } from '@prisma/client';
import { TestingTagDto } from '../dto';

export const convertTestingTagDtoToTagUniqueFilter = (
	data: TestingTagDto
): Prisma.TagWhereUniqueInput => {
	const { id, } = data;

	return {
		id,
	};
};
