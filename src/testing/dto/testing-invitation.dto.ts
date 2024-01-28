import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsObject, IsOptional } from 'class-validator';
import { RoomInvitationStatus } from '@prisma/client';
import { TestingRoomDto } from './testing-room.dto';
import { TestingUserDto } from './testing-user.dto';

export class TestingInvitationDto {
	@ApiProperty({
		description: 'Invitation id',
		type: Number,
		required: false,
	})
	@IsNumber()
	@IsOptional()
	declare id?: number;

	@ApiProperty({
		description: 'What room user was invited in',
		type: TestingRoomDto,
		required: false,
	})
	@IsObject()
	@IsOptional()
	declare room?: TestingRoomDto;

	@ApiProperty({
		description: 'Who invite user into room',
		type: TestingUserDto,
		required: false,
	})
	@IsObject()
	@IsOptional()
	declare inviter?: TestingUserDto;

	@ApiProperty({
		description: 'Who was invited into room',
		type: TestingUserDto,
		required: false,
	})
	@IsObject()
	@IsOptional()
	declare user?: TestingUserDto;

	@ApiProperty({
		description: 'In which status invitation now',
		enum: RoomInvitationStatus,
		required: false,
	})
	@IsEnum(RoomInvitationStatus)
	@IsOptional()
	declare status?: RoomInvitationStatus;
}
