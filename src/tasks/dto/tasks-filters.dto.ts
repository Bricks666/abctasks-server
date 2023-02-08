import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsISO8601, IsNumber, IsOptional } from 'class-validator';

export class TasksFiltersDto {
	@ApiProperty({
		type: Number,
		required: false,
		description: 'Id создателя',
		example: 1,
	})
	@IsNumber()
	@IsOptional()
	@Transform((property) => Number(property.value))
	declare readonly authorId?: number;

	@ApiProperty({
		type: Number,
		required: false,
		description: 'Id группы',
		example: 1,
	})
	@IsNumber()
	@IsOptional()
	@Transform((property) => Number(property.value))
	declare readonly groupId?: number;

	@ApiProperty({
		type: String,
		required: false,
		description:
			'Дата и время в формате ISO8601, задачи до которой включительно ищутся',
		example: '2022-12-15T00:00:00.000Z',
	})
	@IsISO8601()
	@IsOptional()
	declare readonly before?: string;

	@ApiProperty({
		type: String,
		required: false,
		description:
			'Дата и время в формате ISO8601, задачи после которой включительно ищутся',
		example: '2022-12-15T00:00:00.000Z',
	})
	@IsISO8601()
	@IsOptional()
	declare readonly after?: string;
}
