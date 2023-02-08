import {
	Controller,
	Get,
	HttpStatus,
	Param,
	ParseIntPipe
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProgressDto } from './dto';
import { ProgressService } from './progress.service';

@ApiTags('Прогресс')
@Controller('progress')
export class ProgressController {
	constructor(private readonly progressService: ProgressService) {}

	@ApiOperation({
		summary: 'Получение прогресса в комнате',
	})
	@ApiParam({
		name: 'roomId',
		type: Number,
		description: 'Id комнаты',
	})
	@ApiResponse({
		type: ProgressDto,
		isArray: true,
		status: HttpStatus.OK,
		description: 'Прогресс в комнате',
	})
	@Get('/:roomId')
	async getAll(
		@Param('roomId', ParseIntPipe) roomId: number
	): Promise<ProgressDto[]> {
		return this.progressService.getAll({ roomId, });
	}
}
