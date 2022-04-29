import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";

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
		}),
		babel({
			babelHelpers: "bundled",
		}),
	],
};
