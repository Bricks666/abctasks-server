import { Controller, Get } from '@nestjs/common';
import {
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiTags
} from '@nestjs/swagger';
import { DisableIsActivatedCheck, NoAuthCheck } from '@/auth';
import { IntParam } from '@/shared';
import { ProgressDto } from '../dto';
import { ProgressService } from '../services';

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
	@DisableIsActivatedCheck()
	@NoAuthCheck()
	@Get('/:roomId')
	async getAll(@IntParam('roomId') roomId: number): Promise<ProgressDto[]> {
		return this.progressService.getAll({ roomId, });
	}
}
