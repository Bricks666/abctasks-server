import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

/** @type {import("rollup").RollupOptions} */
export default {

	input: "./src/index.ts",
	external: [/node_modules/, /.json/],
	output: {
		file: "./dist/index.js",
		format: "cjs",
		exports: "named",
	},

	plugins: [
		resolve({
			preferBuiltins: true,
		}),
		commonjs(),
		typescript({
			tsconfig: "tsconfig.json",
			tsconfigOverride: {},
		}),
		replace({
			preventAssignment: true,
			values: {
				"'../config/public_key.pem'": "'./config/public_key.pem'",
				"'../config/private_key.pem'": "'./config/private_key.pem'",
			},
		}),
	],
};
