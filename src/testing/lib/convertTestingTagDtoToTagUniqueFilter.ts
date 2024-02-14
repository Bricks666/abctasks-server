import { Prisma } from '@prisma/client';
import { TestingTagDto } from '../dto';

export const convertTestingTagDtoToTagUniqueFilter = (
	data: TestingTagDto
): Prisma.TagWhereUniqueInput | null => {
	const { id, } = data;

	return id
		? {
			id,
		  }
		: null;
};
