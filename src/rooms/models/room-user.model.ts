import { ApiProperty } from '@nestjs/swagger';
import {
	Column,
	ForeignKey,
	Model,
	Table,
	DataType
} from 'sequelize-typescript';
import { User } from '@/users/models';
import { Room } from './room.model';

@Table({
	tableName: 'room-user',
	createdAt: false,
	updatedAt: false,
})
export class RoomUser extends Model<RoomUser> {
	@ApiProperty({
		type: Number,
		description: 'Id комнаты',
		example: 1,
	})
	@ForeignKey(() => Room)
	@Column({
		primaryKey: true,
		type: DataType.INTEGER,
	})
	declare roomId: number;

	@ApiProperty({
		type: Number,
		description: 'Id пользователя',
		example: 1,
	})
	@Column({
		primaryKey: true,
		type: DataType.INTEGER,
	})
	@ForeignKey(() => User)
	declare userId: number;

	@ApiProperty({
		type: Boolean,
		description: 'Удален ли пользователь из комнаты',
		example: false,
	})
	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false,
	})
	declare removed: boolean;
}
