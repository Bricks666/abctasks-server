import { Socket } from 'socket.io';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const WsParam = createParamDecorator<string, ExecutionContext>(
	(paramName, context) => {
		const client: Socket = context.switchToWs().getClient();
		const { query, } = client.handshake;
		return query[paramName];
	}
);
