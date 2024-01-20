import { Prisma } from '@prisma/client';
import { TestingUserDto } from '../dto';

export const convertTestingUserDtoToUserFilter = (
	params: TestingUserDto
): Prisma.UserWhereInput => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password: _password, ...where } = params;
	return where;
};
