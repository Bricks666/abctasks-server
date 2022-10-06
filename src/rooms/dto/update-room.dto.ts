import { PartialType, PickType } from '@nestjs/swagger';
import { Room } from '../models';

export class UpdateRoomDto extends PartialType(PickType(Room, ['roomName', 'roomDescription'])) {}
