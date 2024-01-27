import { Prisma } from '@prisma/client';
import { TestingUserDto } from '../dto';

export const convertTestingUserDtoToUniqueUserFilter = (
	params: TestingUserDto
): Prisma.UserWhereUniqueInput => {
	const { email, id, } = params;

	return {
		id,
		email,
	};
};
