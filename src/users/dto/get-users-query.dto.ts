import { PartialType, PickType, IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from '@/common';
import { UserDto } from './user.dto';

export class GetUsersQueryDto extends IntersectionType(
	PartialType(PickType(UserDto, ['login'] as const)),
	PaginationQueryDto
) {}
