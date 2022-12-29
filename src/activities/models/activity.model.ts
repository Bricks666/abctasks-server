import {
	Column,
	DataType,
	ForeignKey,
	BelongsTo,
	Model,
	Table
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { old_Room } from '@/rooms/models';
import { old_User } from '@/users/models';
import { ActivitySphere } from './activity-sphere.model';

export type ActivityAction = 'update' | 'create' | 'remove';

interface CreateActivity {
	readonly roomId: number;
	readonly sphereId: number;
	readonly action: ActivityAction;
	readonly activistId: number;
}

@Table({
	tableName: 'activities',
	updatedAt: false,
})
export class Activity extends Model<Activity, CreateActivity> {
	@ApiProperty({
		description: 'Id активности',
		example: 1,
		type: Number,
	})
	@IsNumber()
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@ApiProperty({
		description: 'Id комнаты',
		example: 1,
		type: Number,
	})
	@IsNumber()
	@Column({
		type: DataType.INTEGER,
	})
	@ForeignKey(() => old_Room)
	declare roomId: number;

	@ApiProperty({
		description: 'Направление активности',
		example: 1,
		type: Number,
	})
	@IsNumber()
	@ForeignKey(() => ActivitySphere)
	@Column({
		type: DataType.INTEGER,
	})
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
	@Column({
		type: DataType.ENUM<ActivityAction>('create', 'remove', 'update'),
	})
	declare action: ActivityAction;

	@ApiProperty({
		description: 'Id создателя активности',
		example: 1,
		type: Number,
	})
	@Column({
		type: DataType.INTEGER,
	})
	@IsNumber()
	@ForeignKey(() => old_User)
	declare activistId: number;

	declare createdAt: string;

	@BelongsTo(() => ActivitySphere)
	declare sphere: ActivitySphere;
}
