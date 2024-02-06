import { Prisma } from '@prisma/client';
import { TestingUserDto } from '../dto';

export const convertTestingUserDtoToUserUniqueFilter = (
	params: TestingUserDto
): Prisma.UserWhereUniqueInput | null => {
	const { email, id, } = params;

	if (id) {
		return {
			id,
		};
	}

	return email
		? {
			email,
		  }
		: null;
};
