import { ApiProperty } from '@nestjs/swagger';
import { Activity as ActivityModel } from '@prisma/client';
import { IsNumber, IsObject } from 'class-validator';
import { SecurityUserDto } from '@/users';
import { ActivitySphereDto } from './activity-sphere.dto';
import { ActivityActionDto } from './activity-action.dto';

export class ActivityDto
implements Omit<ActivityModel, 'sphereId' | 'activistId' | 'actionId'>
{
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
		type: ActivitySphereDto,
	})
	@IsObject()
	declare sphere: ActivitySphereDto;

	@ApiProperty({
		type: ActivityActionDto,
		description: 'Тип активности',
	})
	@IsObject()
	declare action: ActivityActionDto;

	@ApiProperty({
		description: 'Who made activity',
		type: SecurityUserDto,
	})
	@IsObject()
	declare activist: SecurityUserDto;

	declare createdAt: Date;
}
