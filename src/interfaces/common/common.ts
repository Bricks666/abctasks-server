export type HEX = `#${string}`;
export type MappedObject<T> = {
	[k: string]: T;
};
export type AnyObject = MappedObject<unknown>;
