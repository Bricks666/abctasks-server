import { Prisma } from '@prisma/client';
import { TestingTaskDto } from '../dto';
import { DEFAULT_TASK } from '../configs';

export const convertTestingTaskDtoToTaskUpdate = (
	data: TestingTaskDto
): Prisma.TaskUpdateInput => {
	const {
		title = DEFAULT_TASK.title,
		description = DEFAULT_TASK.description,
		status = DEFAULT_TASK.status,
		createdAt = DEFAULT_TASK.createdAt,
		tags = DEFAULT_TASK.tags,
		updatedAt = DEFAULT_TASK.updatedAt,
	} = data;

	return {
		title,
		description,
		status,
		createdAt,
		updatedAt,
		tags: {
			createMany: {
				data: tags.map((tag) => ({ tagId: tag.id, })),
				skipDuplicates: true,
			},
		},
	};
};
