import { IsDateString, IsNumber, IsString } from 'class-validator';
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Room } from '@/rooms/models';
import { User } from '@/users/models';

export type TaskStatus = 'done' | 'in progress' | 'review' | 'ready';

interface CreateTask {
	readonly roomId: number;
	readonly groupId: number;
	readonly authorId: number;
	readonly status: TaskStatus;
	readonly content: string;
	readonly date: string;
}

@Table({
	tableName: 'task',
	updatedAt: false,
})
export class Task extends Model<Task, CreateTask> {
	@ApiProperty({
		type: Number,
		description: 'Id задачи',
		example: 1,
	})
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	@IsNumber()
	declare taskId: number;

	@ApiProperty({
		type: Number,
		description: 'Id комнаты',
		example: 1,
	})
	@Column({
		type: DataType.INTEGER,
	})
	@ForeignKey(() => Room)
	@IsNumber()
	declare roomId: number;

	@ApiProperty({
		type: Number,
		description: 'Id группы',
		example: 1,
	})
	@Column({
		type: DataType.INTEGER,
	})
	@IsNumber()
	declare groupId: number;

	@ApiProperty({
		type: Number,
		description: 'Id автора',
		example: 1,
	})
	@Column({
		type: DataType.INTEGER,
	})
	@ForeignKey(() => User)
	@IsNumber()
	declare authorId: number;

	@ApiProperty({
		enum: ['done', 'ready', 'review', 'in progress'],
		description: 'Статус задачи',
		example: 'done',
	})
	@Column({
		type: DataType.ENUM<TaskStatus>('done', 'in progress', 'ready', 'review'),
		defaultValue: 'ready',
	})
	@IsString()
	declare status: TaskStatus;

	@ApiProperty({
		type: String,
		description: 'Текст задачи',
		example: 'Текс текст текст',
	})
	@Column({
		type: DataType.STRING,
	})
	@IsString()
	declare content: string;

	@ApiProperty({
		type: String,
		description: 'Дата создания задачи',
		example: '2022-07-07',
	})
	@IsDateString()
	declare createdAt: string;
}
