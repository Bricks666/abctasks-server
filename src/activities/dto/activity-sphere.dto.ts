import { ActivitySphere as ActivitySphereModel } from '@prisma/client';

export class ActivitySphereDto implements ActivitySphereModel {
	declare id: number;

	declare name: string;
}
