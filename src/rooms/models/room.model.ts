import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { IsString, IsNumber } from 'class-validator';
import { User } from '@/users/models';
import { RoomUser } from './room-user.model';

interface CreateRoom {
	readonly roomName: string;
	readonly roomDescription: string;
}

@Table({
	tableName: 'rooms',
	createdAt: false,
})
export class Room extends Model<Room, CreateRoom> {
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
	declare roomId: number;

	@ApiProperty({
		example: 'Room name',
		description: 'Имя комнаты',
		type: String,
	})
	@IsString({})
	@Column({
		type: DataType.STRING,
	})
	declare roomName: string;

	@ApiProperty({
		example: 'Room description',
		description: 'Описание комнаты',
		type: String,
	})
	@IsString({})
	@Column({
		type: DataType.STRING,
	})
	declare roomDescription: string;

	@BelongsToMany(() => User, () => RoomUser)
	declare users: User[];
}
