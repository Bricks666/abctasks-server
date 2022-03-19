import uploader from "express-fileupload";

export const fileUpload = () => {
	return uploader({
		createParentPath: true,
		safeFileNames: true,
	});
};
