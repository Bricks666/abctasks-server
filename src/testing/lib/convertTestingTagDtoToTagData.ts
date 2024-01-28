import { Prisma } from '@prisma/client';
import { TestingTagDto } from '../dto';
import { DEFAULT_TAG } from '../configs';

export const convertTestingTagDtoToTagData = (
	data: TestingTagDto
): Prisma.TagUncheckedCreateInput => {
	const { id, mainColor, name, room, secondColor, } = data;

	return {
		id,
		name: name ?? DEFAULT_TAG.name,
		mainColor: mainColor ?? DEFAULT_TAG.mainColor,
		secondColor: secondColor ?? DEFAULT_TAG.secondColor,
		roomId: room.id ?? DEFAULT_TAG.room?.id,
	};
};
