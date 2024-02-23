import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto<Data> {
	@ApiProperty({
		description: 'Received items count',
	})
	declare count: number;

	@ApiProperty({
		description: 'Total items count selected by params',
	})
	declare totalCount: number;

	@ApiProperty({
		description: 'Selected items on page',
	})
	declare items: Data[];
}
