import { ApiProperty } from '@nestjs/swagger';
import { activity as ActivityModel } from '@prisma/client';
import { IsNumber, IsEnum } from 'class-validator';
import { ActivitySphereDto } from './activity-sphere.dto';

export type ActivityAction = 'update' | 'create' | 'remove';

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
		description: 'Тип активности',
		example: 'create',
		enum: ['create', 'remove', 'update'],
	})
	@IsEnum({
		create: 'create',
		update: 'update',
		remove: 'remove',
	})
	declare action: ActivityAction;

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
