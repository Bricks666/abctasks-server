import { Prisma } from '@prisma/client';
import { TestingTaskDto } from '../dto';
import { DEFAULT_TASK } from '../configs';

export const convertTestingTaskDtoToTaskData = (
	data: TestingTaskDto
): Prisma.TaskUncheckedCreateInput => {
	const {
		title = DEFAULT_TASK.title,
		description = DEFAULT_TASK.description,
		status = DEFAULT_TASK.status,
		author = DEFAULT_TASK.author,
		room = DEFAULT_TASK.room,
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
		authorId: author.id,
		roomId: room.id,
		tags: {
			createMany: {
				data: tags.map((tag) => ({ tagId: tag.id, })),
				skipDuplicates: true,
			},
		},
	};
};
