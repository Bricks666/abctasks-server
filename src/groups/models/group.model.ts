import {
	Column,
	Model,
	Table,
	DataType,
	ForeignKey
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor, IsNumber, IsString } from 'class-validator';
import { old_Room } from '@/rooms/models';
import { HEX } from '@/types/common';

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
		description: 'Id группы',
		example: 'Name',
		type: String,
	})
	@IsString()
	@Column({
		type: DataType.STRING,
	})
	declare name: string;

	@ApiProperty({
		description: 'Основной цвет группы',
		example: '#ffffff',
		type: String,
	})
	@IsHexColor()
	@Column({
		type: DataType.STRING,
	})
	declare mainColor: HEX;

	@ApiProperty({
		description: 'Вторичный цвет группы',
		example: '#ffffff',
		type: String,
	})
	@IsHexColor()
	@Column({
		type: DataType.STRING,
	})
	declare secondColor: HEX;
}
