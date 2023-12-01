import { ApiProperty } from '@nestjs/swagger';
import { TagDto } from '@/tags/dto';

export interface ProgressQueryResult {
	readonly tagId: number;

	readonly completedCount: number;

	readonly totalCount: number;
}

export class ProgressDto {
	@ApiProperty()
	readonly tag: TagDto;

	@ApiProperty()
	readonly completedCount: number;

	@ApiProperty()
	readonly totalCount: number;
}
