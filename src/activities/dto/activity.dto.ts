import { ApiProperty } from '@nestjs/swagger';
import { Activity as ActivityModel } from '@prisma/client';
import { IsNumber } from 'class-validator';
import { ActivitySphereDto } from './activity-sphere.dto';

export class ActivityDto implements ActivityModel {
	@ApiProperty({
		description: 'Id активности',
		example: 1,
		type: Number,
	})
	@IsNumber()
	declare id: number;

	@ApiProperty({
		description: 'Id комнаты',
		example: 1,
		type: Number,
	})
	@IsNumber()
	declare roomId: number;

	@ApiProperty({
		description: 'Направление активности',
		example: 1,
		type: Number,
	})
	@IsNumber()
	declare sphereId: number;

	@ApiProperty({
		type: Number,
		description: 'Тип активности',
		example: 1,
	})
	@IsNumber()
	declare actionId: number;

	@ApiProperty({
		description: 'Id создателя активности',
		example: 1,
		type: Number,
	})
	@IsNumber()
	declare activistId: number;

	declare sphere: ActivitySphereDto;

	declare createdAt: Date;
}
