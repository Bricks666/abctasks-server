import { ApiProperty } from '@nestjs/swagger';
import { ActivityAction } from '@prisma/client';

export class ActivityActionDto implements ActivityAction {
	@ApiProperty()
	declare id: number;

	@ApiProperty()
	declare name: string;
}
