import { ApiProperty } from '@nestjs/swagger';
import { ActivityAction as ActivityActionModel } from '@prisma/client';

export class ActivityAction implements ActivityActionModel {
	@ApiProperty()
	declare id: number;

	@ApiProperty()
	declare name: string;
}
