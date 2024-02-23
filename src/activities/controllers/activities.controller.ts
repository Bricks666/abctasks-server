import { Controller, Get, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
	ApiPaginatedResponse,
	IntParam,
	PaginatedRequestDto,
	SortedRequestDto
} from '@/shared';
import { Activity } from '../entities';
import { ActivitiesService } from '../services';
import {
	ActivitiesFiltersRequestDto,
	GetAllActivitiesByRoomIdResponseDto
} from './contracts';
import {
	convertGetAllActivitiesByRoomIdRequestDto,
	convertGetAllActivitiesByRoomIdResponseDto
} from './lib';

@ApiTags('Activities')
@ApiExtraModels(GetAllActivitiesByRoomIdResponseDto)
@Controller('activities')
export class ActivitiesController {
	constructor(private readonly activitiesService: ActivitiesService) {}

	@ApiOperation({
		summary: 'Take activities from room',
	})
	@ApiPaginatedResponse(Activity)
	@Get('/:roomId')
	async getAll(
		@IntParam('roomId') roomId: number,
		@Query() filtersDto: ActivitiesFiltersRequestDto,
		@Query() paginationDto: PaginatedRequestDto,
		@Query() sortDto: SortedRequestDto
	): Promise<GetAllActivitiesByRoomIdResponseDto> {
		const response = await this.activitiesService.getAllByRoomId(
			convertGetAllActivitiesByRoomIdRequestDto(
				roomId,
				filtersDto,
				paginationDto,
				sortDto
			)
		);

		return convertGetAllActivitiesByRoomIdResponseDto(response);
	}
}
