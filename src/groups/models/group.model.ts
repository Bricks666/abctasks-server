import {
	Column,
	Model,
	Table,
	DataType,
	ForeignKey,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsHexColor, IsNumber } from 'class-validator';
import { HEX } from '@/interfaces/common';
import { Room } from '@/rooms/models';

interface CreateGroup {
	readonly roomId: number;
	readonly groupName: string;
	readonly groupMainColor: HEX;
	readonly groupSecondColor: HEX;
}

@Table({
	tableName: 'groups',
	updatedAt: false,
	createdAt: false,
})
export class Group extends Model<Group, CreateGroup> {
	@ApiProperty({
		description: 'Id группы',
		example: 1,
		type: Number,
	})
	@IsNumber()
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	declare groupId: number;

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
		description: 'Id группы',
		example: 'Name',
		type: String,
	})
	@IsDateString()
	@Column({
		type: DataType.STRING,
	})
	declare groupName: string;

	@ApiProperty({
		description: 'Основной цвет группы',
		example: '#ffffff',
		type: String,
	})
	@IsHexColor()
	@Column({
		type: DataType.STRING,
	})
	declare groupMainColor: HEX;

	@ApiProperty({
		description: 'Вторичный цвет группы',
		example: '#ffffff',
		type: String,
	})
	@IsHexColor()
	@Column({
		type: DataType.STRING,
	})
	declare groupSecondColor: HEX;
}
