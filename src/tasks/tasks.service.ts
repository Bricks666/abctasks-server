import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { Task } from './models';

@Injectable()
export class TasksService {
	constructor(@InjectModel(Task) private readonly tasksRepository: typeof Task) {}

	async getTasks(roomId: number): Promise<Task[]> {
		return this.tasksRepository.findAll({
			where: {
				roomId,
			},
		});
	}

	async getTask(roomId: number, taskId: number): Promise<Task> {
		const task = await this.tasksRepository.findOne({
			where: {
				roomId,
				taskId,
			},
		});

		if (!task) {
			throw new NotFoundException();
		}

		return task;
	}

	async createTask(dto: CreateTaskDto): Promise<Task> {
		return this.tasksRepository.create(dto);
	}

	async updateTask(roomId: number, taskId: number, dto: UpdateTaskDto): Promise<Task> {
		await this.tasksRepository.update(dto, {
			where: {
				roomId,
				taskId,
			},
		});

		return this.getTask(roomId, taskId);
	}

	async deleteTask(roomId: number, taskId: number): Promise<void> {
		await this.tasksRepository.destroy({
			where: {
				roomId,
				taskId,
			},
		});
	}
}
