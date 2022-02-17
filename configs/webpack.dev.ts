import path from "path";
import { Configuration } from "webpack";

export default (_: any, args: any) => {
	const config: Configuration = {
		mode: args.mode || "development",
		entry: path.resolve(__dirname, "..", "src", "index"),
		experiments: {
			outputModule: true,
		},
		optimization: {
			minimize: true,
		},
		output: {
			path: path.resolve(__dirname, "..", "dist"),
			filename: "index.js",
			clean: true,
			chunkFormat: "commonjs",
		},

		resolve: {
			extensions: [".ts", ".js"],
		},
		target: "node",
		devtool: false,
		externals: [/\.html?$/],
		module: {
			rules: [
				{
					test: /\.ts$/,
					loader: "ts-loader",
					exclude: /node_modules/,
					options: {
						compilerOptions: {
							noEmit: false,
						},
					},
				},
			],
		},
		stats: {
			errorDetails: true,
			builtAt: false,
			assets: false,
		},
	};

	return config;
};
