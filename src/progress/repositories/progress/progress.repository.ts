import { Injectable } from '@nestjs/common';
import { Prisma, TaskStatus } from '@prisma/client';
import { DatabaseService } from '@/database/database.service';
import { map } from '@/shared';
import { TagDto } from '@/tags/dto';
import { ProgressDto, ProgressQueryResult } from '../../dto';
import { GetAllParams } from './types';

@Injectable()
export class ProgressRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAll(params: GetAllParams): Promise<ProgressDto[]> {
		const { roomId, } = params;

		const progressQuery = this.databaseService.$queryRawUnsafe<
			ProgressQueryResult[]
		>(
			`SELECT \
 "${Prisma.TagTaskScalarFieldEnum.tagId}",\
 COUNT( \
 "${Prisma.ModelName.Task}"."${Prisma.TaskScalarFieldEnum.id}") FILTER ( \
    where "${Prisma.TaskScalarFieldEnum.status}" = '${TaskStatus.done}'\
 ) as doneCount, \
 COUNT("${Prisma.ModelName.Task}"."${Prisma.TaskScalarFieldEnum.id}") as totalCount \
 FROM "${Prisma.ModelName.TagTask}" \
 JOIN "${Prisma.ModelName.Task}" ON "${Prisma.ModelName.Task}"."${Prisma.TaskScalarFieldEnum.id}" \
 = "${Prisma.ModelName.TagTask}"."${Prisma.TagTaskScalarFieldEnum.taskId}" \
 JOIN "${Prisma.ModelName.Tag}" ON "${Prisma.ModelName.Tag}"."${Prisma.TagScalarFieldEnum.id}" \
 = "${Prisma.ModelName.TagTask}"."${Prisma.TagTaskScalarFieldEnum.tagId}"\
 WHERE "${Prisma.ModelName.TagTask}"."${Prisma.TagTaskScalarFieldEnum.roomId}" = ${roomId} \
 GROUP BY "${Prisma.TagTaskScalarFieldEnum.tagId}";`
		);

		const tagsQuery = this.databaseService.tag.findMany({
			where: {
				roomId,
			},
		});

		const [progress, tags] = await Promise.all([progressQuery, tagsQuery]);

		const mappedTags = map(tags, 'id');

		return progress.map((progress) => {
			const { tagId, ...rest } = progress;

			return {
				...rest,
				tag: mappedTags[tagId] as TagDto,
			};
		});
	}
}
