const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const SriPlugin = require('webpack-subresource-integrity');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const TSconfigPathsWebpackPlugin = require('tsconfig-paths-webpack-plugin');

const tsconfigJs = require('tsconfig.js');
tsconfigJs.watch();

module.exports = (env) => {
    const isDevelopment = env.NODE_ENV === 'development';
    const cwdPath = path.resolve(process.cwd());
    const outputPath = path.resolve(cwdPath, 'dist');
    const publicPath = path.resolve(cwdPath, 'public');
    const srcPath = path.resolve(cwdPath, 'src');

    return {
        // TODO make entry dynamic
        entry: path.resolve(srcPath, 'index.tsx'),
        mode: isDevelopment ? 'development' : 'production',
        devtool: 'inline-source-map',
        stats: isDevelopment ? 'errors-warnings' : 'normal',
        devServer: {
            host: '0.0.0.0',
            port: 8080,
            overlay: {
                errors: true,
                warnings: false,
            },
            hot: true,
        },
        cache: true,
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                hash: !isDevelopment,
                template: path.resolve(publicPath, 'index.html'),
                filename: path.resolve(outputPath, 'index.html'),
                favicon: path.resolve(publicPath, 'favicon.ico'),
            }),
            new SriPlugin({
                hashFuncNames: ['sha384', 'sha512'],
                enabled: !isDevelopment,
            }),
            new WebpackAssetsManifest({
                integrity: true,
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.optimize.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: [
                        'default',
                        { discardComments: { removeAll: true } },
                    ],
                },
                canPrint: true,
            }),
            new MiniCssExtractPlugin(),
        ],
        optimization: {
            minimize: !isDevelopment,
            minimizer: [
                new TerserWebpackPlugin({
                    cache: false,
                    parallel: true,
                    terserOptions: {
                        output: {
                            comments: false,
                        },
                        compress: {
                            warnings: false,
                            pure_getters: true,
                            passes: 3,
                            inline: 1,
                        },
                    },
                    sourceMap: true,
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
                    exclude: [
                        /node_modules/,
                        /\.stories\.tsx?$/,
                        /dist$/,
                        /build$/,
                    ],
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
                                sourceMap: isDevelopment,
                                importLoaders: 1,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDevelopment,
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
                                sourceMap: isDevelopment,
                            },
                        },
                        'postcss-loader',
                    ],
                },
                {
                    test: [/\.worker\.js$/],
                    loader: {
                        loader: 'worker-loader',
                        options: { inline: true, fallback: false },
                    },
                },
                {
                    // Images (uses irl-loader as fallback)
                    test: /\.(png|svg|gif|ico|webp)$/,
                    exclude: [/node_modules/, /\.jpe?g/], // Fuck jpeg! All my homies hate jpeg
                    use: ['file-loader?name=[name].[ext]&limit=8192'],
                },
                {
                    // Fonts
                    test: /\.(woff|woff2|otf|ttf)/,
                    use: 'url-loader',
                },
            ],
        },
        resolve: {
            extensions: [
                '.tsx',
                '.ts',
                '.js',
                '.jsx',
                '.css',
                '.scss',
                '.json',
            ],
            alias: {},
            plugins: [new TSconfigPathsWebpackPlugin()],
            symlinks: false,
        },
        output: {
            filename: isDevelopment
                ? '[name].bundle.js'
                : '[name]-[hash].bundle.js',
            chunkFilename: isDevelopment ? '[id].js' : '[id]-[chunkhash].js',
            crossOriginLoading: 'anonymous',
            path: outputPath,
            publicPath: '/',
        },
        externals: [],
    };
};
