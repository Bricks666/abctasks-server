import { PickType } from '@nestjs/swagger';
import { Room } from '../models';

export class CreateRoomDto extends PickType(Room, ['roomName', 'roomDescription']) {}
