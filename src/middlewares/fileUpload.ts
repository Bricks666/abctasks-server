import { RequestHandler } from "express";
import uploader from "express-fileupload";

export const fileUpload = <Params, Response, Request>() => {
	return uploader({
		createParentPath: true,
		safeFileNames: true,
	}) as unknown as RequestHandler<Params, Response, Request>;
};
