import { PartialType, PickType, IntersectionType } from '@nestjs/swagger';
import { RoomUser } from '@/rooms/models';
import { User } from '../models';
import { PaginationQueryDto } from '@/common';

export class GetUsersQueryDto extends IntersectionType(
	IntersectionType(
		PartialType(PickType(User, ['login'])),
		PartialType(PickType(RoomUser, ['roomId']))
	),
	PaginationQueryDto
) {}
