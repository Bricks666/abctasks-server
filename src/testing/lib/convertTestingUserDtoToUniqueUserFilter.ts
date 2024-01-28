import { Prisma } from '@prisma/client';
import { TestingUserDto } from '../dto';
import { DEFAULT_USER } from '../configs';

export const convertTestingUserDtoToUniqueUserFilter = (
	params: TestingUserDto
): Prisma.UserWhereUniqueInput => {
	const { email, id, } = params;

	if (id) {
		return {
			id,
		};
	}

	return {
		email: email ?? DEFAULT_USER.email,
	};
};
