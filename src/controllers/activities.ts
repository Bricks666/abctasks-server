import { RequestHandler } from 'express';
import { ActivitiesServices } from '@/services';
import { createEventResponse } from '@/utils';
import { ActivitiesResponse } from './activities.types';
import { RoomIdParam } from '@/interfaces/param';

export class ActivitiesController {
	public static getActivities: RequestHandler<RoomIdParam, ActivitiesResponse> = async (
		req,
		res,
		next
	) => {
		try {
			const { roomId } = req.params;
			const activities = await ActivitiesServices.getActivities(+roomId);
			res.json({ activities });
		} catch (e) {
			next(e);
		}
	};

	static subscribeNewActivities: RequestHandler<RoomIdParam> = async (req, res, next) => {
		try {
			res.writeHead(200, {
				Connection: 'keep-alive',
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
			});
			const { roomId } = req.params;
			const unsubscribe = ActivitiesServices.watchNewActivities(+roomId, (activity) =>
				res.write(createEventResponse(activity))
			);
			res.on('close', unsubscribe);
			res.on('error', unsubscribe);
		} catch (e) {
			next(e);
		}
	};
}
