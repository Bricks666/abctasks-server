import { PartialType } from '@nestjs/swagger';
import { RoomInvitationDto } from '@/room-invitations/dto';

export class TestingInvitationDto extends PartialType(RoomInvitationDto) {}
