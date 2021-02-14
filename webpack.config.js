/* eslint-disable @typescript-eslint/no-var-requires */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const SubresourceIntegrityPlugin = require('webpack-subresource-integrity');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const path = require('path');
const chalk = require('chalk');
const tsconfigJs = require('tsconfig.js');
tsconfigJs.watch();

module.exports = (env) => {
	const isDevelopment = !env.production;
	const cwdPath = __dirname;
	const outputPath = path.resolve(cwdPath, 'dist');
	const publicPath = path.resolve(cwdPath, 'public');
	const srcPath = path.resolve(cwdPath, 'src');

	return {
		// TODO make entry dynamic
		entry: path.resolve(srcPath, 'index.tsx'),
		target: 'web',
		mode: isDevelopment ? 'development' : 'production',
		stats: isDevelopment ? 'errors-warnings' : 'normal',
		devServer: {
			host: '0.0.0.0',
			port: 8080,
			overlay: {
				errors: true,
				warnings: false,
			},
			hot: true,
			open: true,
		},
		devtool: isDevelopment ? 'eval' : 'source-map',
		cache: true,
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				hash: !isDevelopment,
				template: path.resolve(publicPath, 'index.html'),
				filename: path.resolve(outputPath, 'index.html'),
				favicon: path.resolve(publicPath, 'favicon.ico'),
			}),
			new SubresourceIntegrityPlugin({
				hashFuncNames: ['sha384', 'sha512'],
				enabled: !isDevelopment,
			}),
			new WebpackAssetsManifest({
				integrity: true,
			}),
			new MiniCssExtractPlugin(),
			new ForkTsCheckerPlugin(),
			new ProgressBarPlugin({
				format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
				clear: true,
			}),
		],
		optimization: {
			minimize: !isDevelopment,
			minimizer: [
				new TerserWebpackPlugin({
					parallel: true,
					terserOptions: {
						output: {
							comments: false,
						},
						compress: {
							pure_getters: true,
							passes: 3,
							inline: 1,
						},
						sourceMap: true,
					},
				}),
				new CssMinimizerPlugin({
					parallel: true,
					minimizerOptions: {
						preset: [
							'default',
							{
								discardComments: { removeAll: true },
							},
						],
					},
				}),
			],
			usedExports: true,
			sideEffects: true,
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: 'ts-loader',
					exclude: [/node_modules/, /\.stories\.tsx?$/, /dist$/, /build$/],
					options: {
						transpileOnly: true,
					},
				},
				{
					test: /\.js$/,
					loader: 'source-map-loader',
					enforce: 'pre',
					exclude: [/node_modules/, /dist$/, /build$/],
				},
				{
					test: /\.module\.(s(a|c)|c)ss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								modules: true,
								sourceMap: !isDevelopment,
								importLoaders: 1,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: !isDevelopment,
							},
						},
						'postcss-loader',
					],
				},
				{
					test: /\.(s(a|c)|c)ss$/,
					exclude: [/\.module\.(s(a|c)|c)ss$/],
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: !isDevelopment,
							},
						},
						'postcss-loader',
					],
				},
				{
					test: [/\.worker\.js$/],
					use: {
						loader: 'worker-loader',
						options: { inline: true, fallback: false },
					},
				},
				{
					// Images (uses irl-loader as fallback)
					test: /\.(png|svg|gif|ico|webp)$/,
					exclude: [/node_modules/, /\.jpe?g/], // Fuck jpeg! All my homies hate jpeg
					//use: ['file-loader?name=[name].[ext]&limit=8192'],
					type: 'asset',
				},
				{
					// Fonts
					test: /\.(woff|woff2|otf|ttf)/,
					use: 'asset/resource',
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss', '.sass', '.css', '.json'],
			alias: {},
			plugins: [new TSConfigPathsPlugin()],
			symlinks: false,
		},
		output: {
			filename: isDevelopment ? '[name].bundle.js' : '[name]-[contenthash].bundle.js',
			assetModuleFilename: 'assets/[hash][ext]',
			chunkFilename: isDevelopment ? '[id].js' : '[id]-[chunkhash].js',
			crossOriginLoading: 'anonymous',
			path: outputPath,
			publicPath: '/',
		},
		externals: [],
		experiments: {
			asset: true,
		},
	};
};
