import { Injectable } from '@nestjs/common';
import { ProgressRepository } from './repository';

@Injectable()
export class ProgressService {
	constructor(private readonly progressRepository: ProgressRepository) {}

	async getAll(roomId: number) {
		return this.progressRepository.getAll(roomId);
	}
}
