const customWebpackConfig = require('../webpack.config');

module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		{
			name: '@storybook/addon-postcss',
			options: {
				postcssLoaderOptions: {
					implementation: require('postcss'),
				},
			},
		},
	],
	webpackFinal: ( config ) => {
		return {
			...config,
			module: {
				...config.module,
				...customWebpackConfig.module
			}
		};
  },
};
