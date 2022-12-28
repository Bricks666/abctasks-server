import { PickType } from '@nestjs/swagger';
import { Comment } from '../models';

export class CreateCommentDto extends PickType(Comment, ['content']) {}
