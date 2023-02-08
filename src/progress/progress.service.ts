import { Injectable } from '@nestjs/common';
import { ProgressRepository } from './repository';
import { GetAllParams } from './types';

@Injectable()
export class ProgressService {
	constructor(private readonly progressRepository: ProgressRepository) {}

	async getAll(params: GetAllParams) {
		return this.progressRepository.getAll(params);
	}
}
