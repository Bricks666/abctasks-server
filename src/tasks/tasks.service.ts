import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { Task } from './models';

@Injectable()
export class TasksService {
	constructor(
		@InjectModel(Task) private readonly tasksRepository: typeof Task
	) {}

	async getAll(roomId: number): Promise<Task[]> {
		return this.tasksRepository.findAll({
			where: {
				roomId,
			},
		});
	}

	async getOne(roomId: number, id: number): Promise<Task> {
		const task = await this.tasksRepository.findOne({
			where: {
				roomId,
				id,
			},
		});

		if (!task) {
			throw new NotFoundException();
		}

		return task;
	}

	async create(
		roomId: number,
		authorId: number,
		dto: CreateTaskDto
	): Promise<Task> {
		return this.tasksRepository.create({ roomId, authorId, ...dto });
	}

	async update(roomId: number, id: number, dto: UpdateTaskDto): Promise<Task> {
		await this.tasksRepository.update(dto, {
			where: {
				roomId,
				id,
			},
		});

		return this.getOne(roomId, id);
	}

	async remove(roomId: number, id: number): Promise<boolean> {
		await this.tasksRepository.destroy({
			where: {
				roomId,
				id,
			},
		});

		return true;
	}
}
