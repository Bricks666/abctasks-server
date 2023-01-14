import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { CreateTaskDto, TaskDto, UpdateTaskDto } from '../dto';

@Injectable()
export class TaskRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAll(roomId: number): Promise<TaskDto[]> {
		const tasks = await this.databaseService.task.findMany({
			where: {
				roomId,
			},
		});

		return tasks;
	}

	async getOne(id: number, roomId: number): Promise<TaskDto | null> {
		return this.databaseService.task.findUnique({
			where: {
				id_roomId: {
					id,
					roomId,
				},
			},
		});
	}

	async create(
		roomId: number,
		authorId: number,
		data: CreateTaskDto
	): Promise<TaskDto> {
		return this.databaseService.task.create({
			data: {
				...data,
				authorId,
				roomId,
			},
		});
	}

	async update(
		id: number,
		roomId: number,
		data: UpdateTaskDto
	): Promise<TaskDto> {
		return this.databaseService.task.update({
			where: {
				id_roomId: {
					id,
					roomId,
				},
			},
			data,
		});
	}

	async remove(id: number, roomId: number): Promise<void> {
		await this.databaseService.task.delete({
			where: {
				id_roomId: {
					id,
					roomId,
				},
			},
		});
	}
}
