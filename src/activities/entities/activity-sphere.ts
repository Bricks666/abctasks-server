import { ApiProperty } from '@nestjs/swagger';
import { ActivitySphere as ActivitySphereModel } from '@prisma/client';

export class ActivitySphere implements ActivitySphereModel {
	@ApiProperty()
	declare id: number;

	@ApiProperty()
	declare name: string;
}
