import { PartialType, PickType, IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from '@/shared';
import { UserDto } from './user.dto';

export class GetUsersQueryDto extends IntersectionType(
	PartialType(PickType(UserDto, ['username'] as const)),
	PaginationQueryDto
) {}
