import crypto from "crypto";
import { writeFileSync } from "fs";
import path from "path";

export const createPairKeys = () => {
	const keyPair = crypto.generateKeyPairSync("rsa", {
		modulusLength: 4096,
		publicKeyEncoding: {
			type: "pkcs1",
			format: "pem",
		},
		privateKeyEncoding: {
			type: "pkcs1",
			format: "pem",
		},
	});
	writeFileSync(
		path.resolve("./dist/config/private_key.pem"),
		keyPair.privateKey
	);
	writeFileSync("./dist/config/public_key.pem", keyPair.publicKey);
};

createPairKeys();
