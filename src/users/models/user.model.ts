import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IsNumber, IsString } from 'class-validator';

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
export class User extends Model<User, CreateUser> {
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
	declare userId: number;

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
	@Column({
		type: DataType.STRING,
		allowNull: true,
		defaultValue: null,
	})
	declare photo?: string | null;
}