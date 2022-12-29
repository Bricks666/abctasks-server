/* eslint-disable max-classes-per-file */
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table
} from 'sequelize-typescript';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Room, RoomUser } from '@/rooms/models';

interface CreateUser {
	readonly login: string;
	readonly password: string;
	readonly photo?: string | null;
}

@Table({
	tableName: 'users',
	createdAt: false,
	updatedAt: false,
})
export class old_User extends Model<old_User, CreateUser> {
	@ApiProperty({
		type: Number,
		description: 'Id пользователя',
		example: 1,
	})
	@IsNumber()
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	})
	declare id: number;

	@ApiProperty({
		type: String,
		description: 'Логин пользователя',
		example: 'Login',
	})
	@IsString()
	@Column({
		type: DataType.STRING,
		unique: true,
	})
	declare login: string;

	@ApiProperty({
		type: String,
		description: 'Пароль пользователя',
		example: 'Password',
	})
	@ApiHideProperty()
	@IsString()
	@Column({
		type: DataType.STRING,
	})
	declare password: string;

	@ApiProperty({
		type: String,
		description: 'Путь на фото пользователя',
		example: null,
		nullable: true,
	})
	@IsString()
	@IsOptional()
	@Column({
		type: DataType.STRING,
		allowNull: true,
		defaultValue: null,
	})
	declare photo?: string | null;

	@BelongsToMany(() => Room, () => RoomUser)
	declare rooms: Room[];
}
