import { Prisma } from '@prisma/client';
import { TestingTaskDto } from '../dto';

export const convertTestingTaskDtoToTaskFilter = (
	data: TestingTaskDto
): Prisma.TaskWhereInput => {
	const {
		id,
		title,
		description,
		status,
		author,
		room,
		createdAt,
		updatedAt,
		tags = [],
	} = data;

	return {
		id,
		title,
		description,
		status,
		createdAt,
		updatedAt,
		authorId: author?.id,
		roomId: room?.id,
		tags: {
			every: {
				tagId: {
					in: tags.map((tag) => tag.id),
				},
			},
		},
	};
};
