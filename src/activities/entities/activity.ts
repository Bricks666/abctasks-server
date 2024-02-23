import { ApiProperty } from '@nestjs/swagger';
import { Activity as ActivityModel } from '@prisma/client';
import { IsNumber, IsObject } from 'class-validator';
import { SecurityUserDto } from '@/users/dto';
import { ActivitySphere } from './activity-sphere';
import { ActivityAction } from './activity-action';

export class Activity
implements Omit<ActivityModel, 'sphereId' | 'activistId' | 'actionId'>
{
	@ApiProperty({
		description: 'Activity id',
		example: 1,
		type: Number,
	})
	@IsNumber()
	declare id: number;

	@ApiProperty({
		description: 'Room id',
		example: 1,
		type: Number,
	})
	@IsNumber()
	declare roomId: number;

	@ApiProperty({
		description: 'Activity sphere',
		type: ActivitySphere,
	})
	@IsObject()
	declare sphere: ActivitySphere;

	@ApiProperty({
		type: ActivityAction,
		description: 'Activity type',
	})
	@IsObject()
	declare action: ActivityAction;

	@ApiProperty({
		description: 'Who made activity',
		type: SecurityUserDto,
	})
	@IsObject()
	declare activist: SecurityUserDto;

	declare createdAt: Date;
}
