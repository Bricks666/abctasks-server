import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomInvitationDto {
	@ApiProperty({
		description: 'What room user was invited in',
		type: Number,
	})
	readonly roomId: number;

	@ApiProperty({
		description: 'Who was invited into room',
		type: Number,
	})
	readonly userId: number;
}
