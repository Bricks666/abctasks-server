import {
	TestingMemberDto,
	TestingRoomDto,
	TestingTagDto,
	TestingTaskDto,
	TestingUserDto
} from '../dto';

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

export const DEFAULT_TAG: TestingTagDto = {
	mainColor: '#000000',
	secondColor: '#ffffff',
	name: 'Testing tag',
};

export const DEFAULT_TASK: TestingTaskDto = {
	author: DEFAULT_USER,
	title: 'Testing task',
	description: 'Testing task description',
	room: DEFAULT_ROOM,
	status: 'ready',
	tags: [DEFAULT_TAG],
	createdAt: new Date('2022-07-07'),
	updatedAt: new Date('2022-07-10'),
};
