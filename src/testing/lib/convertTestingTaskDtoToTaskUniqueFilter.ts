import { Prisma } from '@prisma/client';
import { TestingTaskDto } from '../dto';

export const convertTestingTaskDtoToTaskUniqueFilter = (
	data: TestingTaskDto
): Prisma.TaskWhereUniqueInput => {
	const { id, } = data;

	return {
		id,
	};
};
