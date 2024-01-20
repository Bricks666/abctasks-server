import { PartialType } from '@nestjs/swagger';
import { MemberDto } from '@/members/dto';

export class TestingMemberDto extends PartialType(MemberDto) {}
