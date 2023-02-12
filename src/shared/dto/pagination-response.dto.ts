import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto<Data> {
	@ApiProperty({
		description: 'Количество на странице',
	})
	declare limit: number;

	@ApiProperty({
		description: 'Общее количество по данному запросу',
	})
	declare totalCount: number;

	declare items: Data[];
}
