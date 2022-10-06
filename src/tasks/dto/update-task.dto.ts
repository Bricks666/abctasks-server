import { PickType } from '@nestjs/swagger';
import { Task } from '../models';

export class UpdateTaskDto extends PickType(Task, ['content', 'status']) {}
