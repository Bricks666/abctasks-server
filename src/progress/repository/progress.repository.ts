import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '@/database/database.service';
import { ProgressDto } from '../dto';

@Injectable()
export class ProgressRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAll(roomId: number): Promise<ProgressDto[]> {
		return this.databaseService.$queryRaw<ProgressDto[]>`
    SELECT ${Prisma.TaskScalarFieldEnum.groupId},
    COUNT(${Prisma.TaskScalarFieldEnum.id}) as totalCount,
    COUNT(IF(${Prisma.TaskScalarFieldEnum.status} = 'done',
    ${Prisma.TaskScalarFieldEnum.id}, NULL)) as completedCount FROM ${Prisma.ModelName.task}
    WHERE ${Prisma.TaskScalarFieldEnum.roomId} = ${roomId};
    `;
	}
}
