import { Prisma } from '@prisma/client';

import { TestingUserDto } from '../dto';
import { DEFAULT_USER } from '../configs';

export const convertTestingUserDtoToUserUpdate = (
	data: TestingUserDto
): Prisma.UserUpdateInput => {
	const { password, activated, username, } = data;

	return {
		password: password ?? DEFAULT_USER.password,
		photo: null,
		username: username ?? DEFAULT_USER.username,
		activated: activated ?? DEFAULT_USER.activated,
	};
};
