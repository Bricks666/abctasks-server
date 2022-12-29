import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';
import { Task } from '@/tasks/models';
import { old_User } from '@/users/models';

interface CreateComment {
	readonly authorId: number;
	readonly taskId: number;
	readonly content: string;
}

@Table({
	tableName: 'comments',
	createdAt: true,
	updatedAt: false,
})
export class Comment extends Model<Comment, CreateComment> {
	@ApiProperty({
		type: Number,
		description: 'Id комментария',
		example: 1,
	})
	@IsNumber()
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@ApiProperty({
		type: Number,
		description: 'Id создателя комментария',
		example: 1,
	})
	@IsNumber()
	@Column({
		type: DataType.INTEGER,
	})
	@ForeignKey(() => old_User)
	declare authorId: number;

	@ApiProperty({
		type: Number,
		description: 'Id задачи, к которой оставлен комментарий',
		example: 1,
	})
	@IsNumber()
	@Column({
		type: DataType.INTEGER,
	})
	@ForeignKey(() => Task)
	declare taskId: number;

	@ApiProperty({
		type: String,
		description: 'Тело комментария',
		example: 'Simple comment',
	})
	@IsString()
	@MinLength(6)
	@Column({
		type: DataType.STRING,
	})
	declare content: string;

	declare createdAt: string;
}
