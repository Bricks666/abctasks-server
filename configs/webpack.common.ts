import path from "path";
import { Configuration } from "webpack";

export default (_: any, args: any) => {
	const config: Configuration = {
		mode: args.mode || "development",
		entry: path.resolve(__dirname, "..", "src", "index"),
		optimization: {
			minimize: false,
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
		externals: /\.html$/,
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
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			],
		},
		stats: {
			errorDetails: true,
		},
	};

	return config;
};
