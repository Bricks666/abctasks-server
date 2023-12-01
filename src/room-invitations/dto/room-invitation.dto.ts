import { ApiProperty } from '@nestjs/swagger';
import { RoomInvitationStatus } from '@prisma/client';
import { RoomDto } from '@/rooms/dto';
import { SecurityUserDto } from '@/users/dto';

export class RoomInvitationDto {
	@ApiProperty({
		description: 'Invitation id',
		type: Number,
	})
	readonly id: number;

	@ApiProperty({
		description: 'What room user was invited in',
		type: RoomDto,
	})
	readonly room: RoomDto;

	@ApiProperty({
		description: 'Who invite user into room',
		type: SecurityUserDto,
	})
	readonly inviter: SecurityUserDto;

	@ApiProperty({
		description: 'Who was invited into room',
		type: SecurityUserDto,
	})
	readonly user: SecurityUserDto;

	@ApiProperty({
		description: 'In which status invitation now',
		enum: RoomInvitationStatus,
	})
	readonly status: RoomInvitationStatus;
}
