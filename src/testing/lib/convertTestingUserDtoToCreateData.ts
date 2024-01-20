import { Prisma } from '@prisma/client';

import { TestingUserDto } from '../dto';
import { DEFAULT_USER } from '../configs';

export const convertTestingUserDtoToCreateData = (
	data: TestingUserDto
): Prisma.UserUncheckedCreateInput => {
	return {
		id: data.id,
		email: data.email ?? DEFAULT_USER.email,
		password: data.password ?? DEFAULT_USER.password,
		photo: data.photo ?? DEFAULT_USER.photo,
		username: data.username ?? DEFAULT_USER.username,
		activated: data.activated ?? DEFAULT_USER.activated,
	};
};
