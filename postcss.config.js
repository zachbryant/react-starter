/* eslint-disable @typescript-eslint/no-var-requires */
const tailwind = require('tailwindcss');
const cssnano = require('cssnano');
const purgecss = require('@fullhuman/postcss-purgecss');

const isProduction = process.env.NODE_ENV === 'production';

const productionPlugins = isProduction
	? [
			purgecss({
				content: [
					'./src/**/*.html',
					'./src/**/*.tsx',
					'./src/**/*.ts',
					'./src/**/*.scss',
					'./src/**/*.sass',
					'./src/**/*.css',
				],
				defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
			}),
			cssnano({ preset: 'default' }),
			require('autoprefixer'),
	  ]
	: [];

module.exports = {
	plugins: [tailwind('./tailwind.config.js'), require('postcss-import'), ...productionPlugins],
};
