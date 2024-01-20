import { PartialType } from '@nestjs/swagger';
import { TaskDto } from '@/tasks';

export class TestingTaskDto extends PartialType(TaskDto) {}
