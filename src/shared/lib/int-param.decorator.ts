import { Param, ParseIntPipe } from '@nestjs/common';

export const IntParam = (key) => {
	return Param(key, ParseIntPipe);
};
