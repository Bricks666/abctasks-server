import { PartialType, PickType, IntersectionType } from '@nestjs/swagger';
import { RoomUser } from '@/rooms/models';
import { UserDto } from './user.dto';
import { PaginationQueryDto } from '@/common';

export class GetUsersQueryDto extends IntersectionType(
	IntersectionType(
		PartialType(PickType(UserDto, ['login'])),
		PartialType(PickType(RoomUser, ['roomId']))
	),
	PaginationQueryDto
) {}
