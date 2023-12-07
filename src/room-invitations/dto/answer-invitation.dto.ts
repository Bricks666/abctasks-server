import { ApiProperty } from '@nestjs/swagger';

export class AnswerInvitationDto {
	@ApiProperty({
		type: Number,
		description: 'Invitation id',
	})
	readonly id: number;
}
