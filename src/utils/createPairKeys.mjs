import crypto from "crypto";
import { mkdir, writeFileSync } from "fs";
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
	mkdir(
		"./dist/config",
		{
			recursive: true,
		},
		() => {
			null;
		}
	);
	writeFileSync(
		path.resolve("./dist/config/private_key.pem"),
		keyPair.privateKey
	);
	writeFileSync("./dist/config/public_key.pem", keyPair.publicKey);
};

createPairKeys();
