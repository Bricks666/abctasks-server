import { Transform } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class GetTasksQueryDto {
	@IsNumber()
	@IsOptional()
	@Transform((property) => Number(property.value))
	declare readonly authorId?: number;

	@IsNumber()
	@IsOptional()
	@Transform((property) => Number(property.value))
	declare readonly groupId?: number;

	@IsDateString()
	@IsOptional()
	declare readonly before?: string;

	@IsDateString()
	@IsOptional()
	declare readonly after?: string;
}
