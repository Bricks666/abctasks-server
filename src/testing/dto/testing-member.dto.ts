import { ApiProperty } from '@nestjs/swagger';
import { MemberStatus } from '@prisma/client';
import { IsEnum, IsObject, IsOptional } from 'class-validator';
import { TestingRoomDto } from './testing-room.dto';
import { TestingUserDto } from './testing-user.dto';

export class TestingMemberDto {
	@ApiProperty({
		type: () => TestingRoomDto,
		required: false,
	})
	@IsObject()
	@IsOptional()
	declare room?: TestingRoomDto;

	@ApiProperty({
		type: () => TestingUserDto,
		required: false,
	})
	@IsObject()
	@IsOptional()
	declare user?: TestingUserDto;

	@ApiProperty({
		enum: MemberStatus,
		required: false,
	})
	@IsEnum(MemberStatus)
	@IsOptional()
	declare status?: MemberStatus;
}
