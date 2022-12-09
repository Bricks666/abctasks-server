import { Logger, ParseIntPipe } from '@nestjs/common';
import {
	SubscribeMessage,
	WebSocketGateway,
	OnGatewayConnection,
	OnGatewayDisconnect,
	WebSocketServer,
	ConnectedSocket,
	MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CORS, WS } from '@/const';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TasksService } from './tasks.service';
import { WsParam } from '@/decorators/ws-param.decorator';
import { AuthService } from '@/auth/auth.service';

@WebSocketGateway({
	namespace: 'tasks',
	transports: ['websocket'],
	serveClient: true,
	cors: {
		origin: CORS.ORIGIN,
		credentials: true,
	},
})
export class TasksGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server;

	#logger: Logger = new Logger('Tasks gateway');

	constructor(
		private readonly tasksService: TasksService,
		private readonly authService: AuthService
	) {}

	handleConnection(client: Socket) {
		const roomId = this.#extractRoomId(client);
		if (!roomId) {
			return;
		}
		client.join(WS.rooms.room(roomId));
	}

	handleDisconnect(client: Socket) {
		const roomId = this.#extractRoomId(client);
		if (!roomId) {
			return;
		}
		client.leave(WS.rooms.room(roomId));
	}

	@SubscribeMessage('create')
	async create(
		@ConnectedSocket() client: Socket,
		@MessageBody() dto: CreateTaskDto,
		@WsParam(WS.queries.roomId, ParseIntPipe) roomId: number
	): Promise<void> {
		const task = await this.tasksService.create(roomId, 1, dto);

		this.server.to(WS.rooms.room(roomId)).emit(WS.events.roomCreated, task);
	}

	@SubscribeMessage('update')
	async update(
		@ConnectedSocket() client: Socket,
		@MessageBody() dto: UpdateTaskDto,
		@WsParam(WS.queries.roomId, ParseIntPipe) roomId: number,
		@WsParam(WS.queries.taskId, ParseIntPipe) taskId: number
	): Promise<void> {
		const task = await this.tasksService.update(roomId, taskId, dto);

		this.server.to(WS.rooms.room(roomId)).emit(WS.events.roomUpdated, task);
	}

	@SubscribeMessage('remove')
	async remove(
		@ConnectedSocket() client: Socket,
		@WsParam(WS.queries.roomId, ParseIntPipe) roomId: number,
		@MessageBody(ParseIntPipe) taskId: number
	): Promise<void> {
		const response = await this.tasksService.remove(roomId, taskId);
		if (response) {
			this.server.to(WS.rooms.room(roomId)).emit(WS.events.roomRemoved);
		}
	}

	#extractRoomId(client: Socket): number | undefined {
		const { query } = client.handshake;
		const { [WS.queries.roomId]: roomId } = query;
		if (Number.isNaN(Number(roomId))) {
			client.disconnect();
			return;
		}

		return Number(roomId);
	}
}
