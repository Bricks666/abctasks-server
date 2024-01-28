import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { TestingUserDto } from './testing-user.dto';

export class TestingLoginDto extends TestingUserDto {
	@ApiProperty({
		type: Boolean,
		description: 'Should cookie be setup as no session',
		default: true,
	})
	@IsOptional()
	@IsBoolean()
	declare remember?: boolean;
}
