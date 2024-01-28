import { Prisma } from '@prisma/client';
import { TestingTagDto } from '../dto';
import { DEFAULT_TAG } from '../configs';

export const convertTestingTagDtoToTagUpdate = (
	data: TestingTagDto
): Prisma.TagUpdateInput => {
	const { mainColor, name, secondColor, } = data;

	return {
		name: name ?? DEFAULT_TAG.name,
		mainColor: mainColor ?? DEFAULT_TAG.mainColor,
		secondColor: secondColor ?? DEFAULT_TAG.secondColor,
	};
};
