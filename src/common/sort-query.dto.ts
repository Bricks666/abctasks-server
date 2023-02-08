import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

type SortType = 'desc' | 'asc';

export class SortQueryDto {
	@ApiProperty({
		type: String,
		description: 'Поле по которому проводится сортировка',
		required: false,
	})
	@IsString()
	@IsOptional()
	declare by?: string;

	@ApiProperty({
		description: 'Порядок сортировки',
		example: 'desc',
		required: false,
		default: 'asc',
		enum: {
			asc: 'asc',
			desc: 'desc',
		},
	})
	@IsOptional()
	@IsEnum({
		asc: 'asc',
		desc: 'desc',
	})
	declare type?: SortType;
}
