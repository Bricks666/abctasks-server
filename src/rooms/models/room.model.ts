import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { IsString, IsNumber } from 'class-validator';
import { Group } from '@/groups/models';

interface CreateRoom {
	readonly roomName: string;
	readonly roomDescription: string;
}

@Table({
	tableName: 'rooms',
	updatedAt: true,
})
export class old_Room extends Model<old_Room, CreateRoom> {
	@ApiProperty({
		example: 1,
		description: 'Id комнаты',
		type: Number,
	})
	@IsNumber({})
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	declare id: number;

	@ApiProperty({
		example: 'Room name',
		description: 'Имя комнаты',
		type: String,
	})
	@IsString({})
	@Column({
		type: DataType.STRING,
	})
	declare name: string;

	@ApiProperty({
		example: 'Room description',
		description: 'Описание комнаты',
		type: String,
	})
	@IsString({})
	@Column({
		type: DataType.STRING,
	})
	declare description: string;

	@HasMany(() => Group)
	declare groups: Group[];
}
