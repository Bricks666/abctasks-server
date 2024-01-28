import { Prisma } from '@prisma/client';

import { TestingUserDto } from '../dto';
import { DEFAULT_USER } from '../configs';

export const convertTestingUserDtoToUserData = (
	data: TestingUserDto
): Prisma.UserUncheckedCreateInput => {
	const { id, password, activated, email, username, } = data;

	return {
		id,
		email: email ?? DEFAULT_USER.email,
		password: password ?? DEFAULT_USER.password,
		photo: null,
		username: username ?? DEFAULT_USER.username,
		activated: activated ?? DEFAULT_USER.activated,
	};
};
