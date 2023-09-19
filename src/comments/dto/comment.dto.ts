import { ApiProperty } from '@nestjs/swagger';
import { Comment as CommentModel } from '@prisma/client';
import { IsNumber, IsString, MinLength } from 'class-validator';

export class CommentDto implements CommentModel {
	@ApiProperty({
		type: Number,
		description: 'Id комментария',
		example: 1,
	})
	@IsNumber()
	declare id: number;

	@ApiProperty({
		type: Number,
		description: 'Id создателя комментария',
		example: 1,
	})
	@IsNumber()
	declare authorId: number;

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
