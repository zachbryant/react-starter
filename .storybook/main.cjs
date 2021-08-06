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
		return {
			...config,
			resolve: {
				...config.resolve,
				plugins: [...customWebpackConfig.resolve.plugins],
			},
		};
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
