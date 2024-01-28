import { ApiProperty } from '@nestjs/swagger';
import { MemberStatus } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class TestingMemberDto {
	@ApiProperty({
		type: Number,
		required: false,
	})
	@IsNumber()
	@IsOptional()
	declare roomId?: number;

	@ApiProperty({
		type: Number,
		required: false,
	})
	@IsNumber()
	@IsOptional()
	declare userId?: number;

	@ApiProperty({
		enum: MemberStatus,
		required: false,
	})
	@IsEnum(MemberStatus)
	@IsOptional()
	declare status?: MemberStatus;
}
