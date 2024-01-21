import { Prisma } from '@prisma/client';
import { TestingUserDto } from '../dto';

export const convertTestingUserDtoToUserFilter = (
	params: TestingUserDto
): Prisma.UserWhereInput => {
	const { email, id, activated, username, } = params;

	return {
		id,
		email,
		username,
		activated,
	};
};
