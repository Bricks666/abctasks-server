import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export type SortOderType = 'desc' | 'asc';

export class SortedRequestDto {
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
	declare type?: SortOderType;
}
