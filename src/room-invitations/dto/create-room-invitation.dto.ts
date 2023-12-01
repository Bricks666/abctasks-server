import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomInvitationDto {
	@ApiProperty({
		description: 'Who was invited into room',
		type: Number,
	})
	readonly userId: number;
}
