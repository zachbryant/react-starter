/* eslint-disable @typescript-eslint/no-var-requires */
const tailwind = require('tailwindcss');
const cssnano = require('cssnano');
const purgecss = require('@fullhuman/postcss-purgecss');

const isProduction = process.env.NODE_ENV === 'production';

const productionPlugins = isProduction
	? [
			purgecss({
				content: ['./src/**/*.(html|tsx|ts|js|jsx|scss|sass|css)'],
				defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
			}),
			cssnano({ preset: 'default' }),
			require('autoprefixer'),
	  ]
	: [];

module.exports = {
	parser: 'postcss-scss',
	modules: true,
	plugins: [require('postcss-import'), tailwind(), ...productionPlugins],
};
