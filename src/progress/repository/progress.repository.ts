import { Injectable } from '@nestjs/common';
import { Prisma, task_status } from '@prisma/client';
import { DatabaseService } from '@/database/database.service';
import { ProgressDto } from '../dto';
import { GetAllParams } from './types';

@Injectable()
export class ProgressRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAll(params: GetAllParams): Promise<ProgressDto[]> {
		const { roomId, } = params;

		return this.databaseService.$queryRawUnsafe<ProgressDto[]>(
			`SELECT ${Prisma.TaskScalarFieldEnum.groupId}, \
COUNT(${Prisma.TaskScalarFieldEnum.id}) as totalCount, \
COUNT(IF(${Prisma.TaskScalarFieldEnum.status} = ?, \
${Prisma.TaskScalarFieldEnum.id}, NULL)) as completedCount FROM ${Prisma.ModelName.task} \
WHERE ${Prisma.TaskScalarFieldEnum.roomId} = ? \
GROUP BY ${Prisma.TaskScalarFieldEnum.groupId};`,
			task_status.done,
			roomId
		);
	}
}
