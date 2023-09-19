import { ApiProperty } from '@nestjs/swagger';
import { Comment as CommentModel } from '@prisma/client';
import { IsNumber, IsObject, IsString, MinLength } from 'class-validator';
import { SecurityUserDto } from '@/users';

export class CommentDto implements Omit<CommentModel, 'authorId'> {
	@ApiProperty({
		type: Number,
		description: 'Id комментария',
		example: 1,
	})
	@IsNumber()
	declare id: number;

	@ApiProperty({
		type: SecurityUserDto,
		description: 'Comment creator',
	})
	@IsObject()
	declare author: SecurityUserDto;

	@ApiProperty({
		type: Number,
		description: 'Id комнаты',
		example: 1,
	})
	@IsNumber()
	declare roomId: number;

	@ApiProperty({
		type: Number,
		description: 'Id задачи, к которой оставлен комментарий',
		example: 1,
	})
	@IsNumber()
	declare taskId: number;

	@ApiProperty({
		type: String,
		description: 'Тело комментария',
		example: 'Simple comment',
	})
	@IsString()
	@MinLength(6)
	declare content: string;

	declare createdAt: Date;

	declare updatedAt: Date;
}
