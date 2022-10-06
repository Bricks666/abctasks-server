import { RequestHandler } from 'express';
import { createEventResponse } from '@/utils';
import { ProgressServices } from '@/services/';
import { RoomIdParam } from '@/interfaces/param';
import { ProgressResponse } from './progress.types';

export class ProgressControllers {
	public static getTasksProgress: RequestHandler<RoomIdParam, ProgressResponse> = async (
		req,
		res,
		next
	) => {
		try {
			const { roomId } = req.params;

			const tasksProgress = await ProgressServices.getTasksProgress(+roomId);

			res.json({ tasksProgress });
		} catch (e) {
			next(e);
		}
	};

	public static subscribeChangeProgress: RequestHandler<RoomIdParam> = async (req, res, next) => {
		try {
			res.writeHead(200, {
				Connection: 'keep-alive',
				'Content-Type': 'text/event-stream',
				'Change-Control': 'no-cache',
			});
			const { roomId } = req.params;
			const unsubscribe = ProgressServices.subscribeChangeProgress(+roomId, (progress) =>
				res.write(createEventResponse(progress))
			);
			res.once('close', unsubscribe);
			res.once('error', unsubscribe);
		} catch (e) {
			next(e);
		}
	};
}
