const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const customWebpackConfig = require('../webpack.config.cjs')({});

module.exports = {
	core: {
		builder: 'webpack5',
	},
	features: {
		previewCsfV3: true,
	},
	stories: ['../src/ui/**/*.stories.@(tsx|jsx|mdx)'],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-jest',
		'@storybook/addon-links',
		'@storybook/addon-storyshots',
		{
			name: '@storybook/addon-postcss',
			options: {
				postcssLoaderOptions: {
					implementation: require('postcss'),
				},
			},
		},
	],
	webpackFinal: (config) => {
		config.plugins.push(new MiniCssExtractPlugin());
		config.resolve.plugins = customWebpackConfig.resolve.plugins;
		config.module.rules.push({
			test: /\.(s(a|c)|c)ss$/,
			exclude: [/\.module\.(s(a|c)|c)ss$/],
			use: [
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						sourceMap: false,
						importLoaders: 1,
					},
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: false,
					},
				},
				'postcss-loader',
			],
		});
		return config;
	},
	typescript: {
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			compilerOptions: {
				allowSyntheticDefaultImports: true,
				esModuleInterop: true,
			},
		},
	},
};
