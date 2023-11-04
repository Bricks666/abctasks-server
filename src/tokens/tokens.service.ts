import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class TokensService {
	constructor(private readonly jwtService: JwtService) {}

	generateInsecure(
		payload: string | Buffer | object,
		duration?: string | number
	): Promise<string> {
		const params: JwtSignOptions = {
			secret: process.env.INSECURE_DATA_SECRET,
		};

		if (duration) {
			params.expiresIn = duration;
		}

		return this.jwtService.signAsync(payload, params);
	}

	verifyInsecure<T extends object>(token: string): Promise<T> {
		return this.jwtService.verifyAsync(token, {
			secret: process.env.INSECURE_DATA_SECRET,
		});
	}

	generateSecure(
		payload: string | Buffer | object,
		duration: string | number
	): Promise<string> {
		return this.jwtService.signAsync(payload, {
			secret: process.env.SECRET,
			expiresIn: duration,
		});
	}

	verifySecure<T extends object>(token: string): Promise<T> {
		return this.jwtService.verifyAsync(token, {
			secret: process.env.SECRET,
		});
	}
}
