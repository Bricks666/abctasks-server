import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { Room } from '@/rooms/models';
import { User } from '@/users/models';

export type ActivitySphere = 'group' | 'task';

export type ActivityType = 'update' | 'create' | 'delete';

interface CreateActivity {
	readonly roomId: number;
	readonly sphere: ActivitySphere;
	readonly type: ActivityType;
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
	@ForeignKey(() => Room)
	declare roomId: number;

	@ApiProperty({
		description: 'Направление активности',
		enum: ['group', 'task'],
		example: 'group',
	})
	@IsEnum({
		task: 'task',
		group: 'group',
	})
	@Column({
		type: DataType.ENUM<ActivitySphere>('group', 'task'),
	})
	declare sphere: ActivitySphere;

	@ApiProperty({
		description: 'Тип активности',
		example: 'create',
		enum: ['create', 'delete', 'update'],
	})
	@IsEnum({
		create: 'create',
		update: 'update',
		delete: 'delete',
	})
	@Column({
		type: DataType.ENUM<ActivityType>('create', 'delete', 'update'),
	})
	declare type: ActivityType;

	@ApiProperty({
		description: 'Id создателя активности',
		example: 1,
		type: Number,
	})
	@Column({
		type: DataType.INTEGER,
	})
	@IsNumber()
	@ForeignKey(() => User)
	declare activistId: number;

	declare createdAt: string;
}
