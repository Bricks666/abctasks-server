import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProgressDto } from './dto';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
	constructor(private readonly progressService: ProgressService) {}

	@Get(':roomId')
	async getAll(
		@Param('roomId', ParseIntPipe) roomId: number
	): Promise<ProgressDto[]> {
		return this.progressService.getAll(roomId);
	}
}
