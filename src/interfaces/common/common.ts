export type HEX = `#${string}`;
export type MappedObject<T> = {
	[k: string]: T;
};
export type AnyObject = MappedObject<unknown>;

export type UnReadonly<T> = {
	-readonly [key in keyof T]: T[key];
};

export type ChangeType<TF, Keys extends keyof TF, T> = {
	[key in keyof TF]: key extends Keys ? T : TF[key];
};
