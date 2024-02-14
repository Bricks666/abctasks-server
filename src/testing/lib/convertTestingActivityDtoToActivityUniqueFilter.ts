import { Prisma } from '@prisma/client';
import { TestingActivityDto } from '../dto';

export const convertTestingActivityDtoToActivityUniqueFilter = (
	dto: TestingActivityDto
): Prisma.ActivityWhereUniqueInput | null => {
	const { id, } = dto;

	return id
		? {
			id,
		  }
		: null;
};
