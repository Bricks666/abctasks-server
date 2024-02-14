import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsObject } from 'class-validator';
import { NumberTransform } from '@/shared';
import { TestingMemberDto } from './testing-member.dto';

export class TestingRoomDto {
	@ApiProperty({
		example: 1,
		description: 'Id комнаты',
		type: Number,
		required: false,
	})
	@NumberTransform()
	@IsNumber({})
	@IsOptional()
	declare id?: number;

	@ApiProperty({
		example: 1,
		description: 'ID создателя комнаты',
		type: Number,
		required: false,
	})
	@NumberTransform()
	@IsNumber()
	@IsOptional()
	declare ownerId?: number;

	@ApiProperty({
		example: 'Room name',
		description: 'Имя комнаты',
		type: String,
		required: false,
	})
	@IsString()
	@IsOptional()
	declare name?: string;

	@ApiProperty({
		example: 'Room description',
		description: 'Описание комнаты',
		type: String,
		required: false,
	})
	@IsString()
	@IsOptional()
	declare description?: string;

	@ApiProperty({
		example: [],
		description: 'Описание комнаты',
		type: () => OmitType(TestingMemberDto, ['room']),
		required: false,
	})
	@IsObject({
		each: true,
	})
	@IsOptional()
	declare members?: Omit<TestingMemberDto, 'room'>[];
}
