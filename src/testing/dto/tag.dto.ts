import { PartialType } from '@nestjs/swagger';
import { TagDto } from '@/tags';

export class TestingTagDto extends PartialType(TagDto) {}
