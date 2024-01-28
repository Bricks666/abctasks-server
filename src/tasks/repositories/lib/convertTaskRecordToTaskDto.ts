import { TaskDto } from '@/tasks/dto';
import { TagDto } from '@/tags/dto';
import { TaskRecord } from '../task/types';

export const convertTaskRecordToTaskDto = (record: TaskRecord): TaskDto => {
	const { tags, author, ...rest } = record;

	return {
		...rest,
		author: author.user,
		tags: tags.map((tags) => tags.tag) as TagDto[],
	};
};
