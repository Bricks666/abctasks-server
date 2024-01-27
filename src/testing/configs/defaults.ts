import { TestingMemberDto, TestingRoomDto, TestingUserDto } from '../dto';

export const DEFAULT_USER: TestingUserDto = {
	activated: true,
	email: 'testing@test.com',
	username: 'testing user name',
	password: 'some-password',
};

export const DEFAULT_ROOM: TestingRoomDto = {
	name: 'Room',
	description: 'Description',
};

export const DEFAULT_MEMBER: TestingMemberDto = {
	status: 'activated',
};
