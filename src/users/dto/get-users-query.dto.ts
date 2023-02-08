import { PartialType, PickType, IntersectionType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';
import { PaginationQueryDto } from '@/common';

export class GetUsersQueryDto extends IntersectionType(
	PartialType(PickType(UserDto, ['login'])),
	PaginationQueryDto
) {}
