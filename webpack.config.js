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
const ESLintPlugin = require('eslint-webpack-plugin');
//const StylelintPlugin = require('stylelint-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const path = require('path');
const chalk = require('chalk');
const tsconfigJs = require('tsconfig.js');
tsconfigJs.watch();

module.exports = (env) => {
	const isProduction = env.production ?? false;
	const isDevelopment = !isProduction;
	const cwdPath = __dirname;
	const outputPath = path.resolve(cwdPath, 'dist');
	const srcPath = path.resolve(cwdPath, 'src');
	const pagePath = path.resolve(srcPath, 'ui/pages');
	const assetPath = path.resolve(srcPath, 'assets');

	return {
		entry: {
			main: path.resolve(pagePath, 'index.tsx'),
		},
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
		cache: {
			type: 'filesystem',
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				hash: isProduction,
				template: path.resolve(pagePath, 'index.html'),
				filename: path.resolve(outputPath, 'index.html'),
				favicon: path.resolve(assetPath, 'images/favicon.ico'),
			}),
			new SubresourceIntegrityPlugin({
				hashFuncNames: ['sha384', 'sha512'],
				enabled: isProduction,
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
			new ESLintPlugin({ cache: true, exclude: ['node_modules/', 'dist', 'templates'] }),
			//new StylelintPlugin({ cache: true }),
			new CircularDependencyPlugin({
				include: /src/,
				failOnError: true,
				// allow import cycles that include an asynchronous import,
				// e.g. via import(/* webpackMode: "weak" */ './file.js')
				allowAsyncCycles: false,
				cwd: process.cwd(),
			}),
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
				openAnalyzer: isProduction,
			}),
			new DuplicatePackageCheckerPlugin(),
			new CompressionPlugin({
				algorithm: 'gzip',
			}),
		],
		optimization: {
			splitChunks: {
				chunks: isProduction ? 'all' : 'initial',
				name: false,
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
					},
				},
			},
			runtimeChunk: 'single',
			minimize: isProduction,
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
					loader: 'esbuild-loader',
					exclude: [/node_modules/, /\.stories\.tsx?$/, /dist$/, /build$/],
					options: {
						loader: 'tsx',
						target: 'esnext',
					},
				},
				{
					test: /\.jsx?$/,
					loader: 'esbuild-loader',
					exclude: [/node_modules/, /\.stories\.jsx?$/, /dist$/, /build$/],
					options: {
						loader: 'jsx',
						target: 'esnext',
					},
				},
				{
					test: /\.module\.(s(a|c)|c)ss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								modules: true,
								sourceMap: isProduction,
								importLoaders: 1,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: isProduction,
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
								sourceMap: isProduction,
								importLoaders: 1,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: isProduction,
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
					// Images (uses url-loader as fallback)
					test: /\.(png|gif|ico|webp|webm)$/,
					exclude: [/node_modules/, /\.jpe?g/], // Fuck jpeg! All my homies hate jpeg
					//use: ['file-loader?name=[name].[ext]&limit=8192'],
					type: 'asset',
				},
				{
					test: /\.svg$/,
					use: [{ loader: 'svg-sprite-loader' }, 'svg-transform-loader', 'svgo-loader'],
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
