import { Prisma } from '@prisma/client';
import { TestingTagDto } from '../dto';

export const convertTestingTagDtoToTagFilter = (
	data: TestingTagDto
): Prisma.TagWhereInput => {
	const { id, mainColor, name, room, secondColor, } = data;

	return {
		id,
		name,
		mainColor,
		secondColor,
		roomId: room?.id,
	};
};
