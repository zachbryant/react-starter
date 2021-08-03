const customWebpackConfig = require('../webpack.config.cjs')({});

module.exports = {
	core: {
		builder: 'webpack5',
	},
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		//'@storybook/addon-actions',
		//'@storybook/addon-docs',
		//'@storybook/addon-console',
		//'@storybook/addon-controls',
		'@storybook/addon-essentials',
		'@storybook/addon-jest',
		'@storybook/addon-links',
		'@storybook/addon-storyshots',
		//'@storybook/addon-toolbars',
		//'@storybook/addon-viewport',
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
		return {
			...config,
			resolve: {
				...config.resolve,
				plugins: [...customWebpackConfig.resolve.plugins],
			},
		};
	},
};
