import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import {
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags
} from '@nestjs/swagger';
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
	@ApiOkResponse({
		type: ProgressDto,
		isArray: true,
		description: 'Прогресс в комнате',
	})
	@Get('/:roomId')
	async getAll(
		@Param('roomId', ParseIntPipe) roomId: number
	): Promise<ProgressDto[]> {
		return this.progressService.getAll({ roomId, });
	}
}
