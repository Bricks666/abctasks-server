import { PaginationResponseDto } from '@/shared';
import { Activity } from '../../entities';

export class GetAllActivitiesByRoomIdResponseDto extends PaginationResponseDto<Activity> {}
