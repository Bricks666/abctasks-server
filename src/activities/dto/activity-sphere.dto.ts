import { ApiProperty } from '@nestjs/swagger';
import { ActivitySphere } from '@prisma/client';

export class ActivitySphereDto implements ActivitySphere {
	@ApiProperty()
	declare id: number;

	@ApiProperty()
	declare name: string;
}
