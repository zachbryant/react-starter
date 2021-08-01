/* eslint-disable @typescript-eslint/no-var-requires */
const { generatePaths } = require('tsconfig-paths-autogen');
const { onmyjs } = require('onmyjs');

const baseUrl = 'src';

module.exports = {
	compilerOptions: {
		target: 'esnext',
		lib: ['dom', 'dom.iterable', 'esnext'],
		allowJs: true,
		skipLibCheck: true,
		esModuleInterop: true,
		allowSyntheticDefaultImports: true,
		noImplicitReturns: true,
		strict: true,
		forceConsistentCasingInFileNames: true,
		module: 'esnext',
		moduleResolution: 'node',
		resolveJsonModule: true,
		isolatedModules: true,
		noEmit: false,
		jsx: 'react',
		newLine: 'lf',
		baseUrl,
		paths: generatePaths(baseUrl, {
			rootAlias: '@',
			maxDirectoryDepth: 2,
			excludeAliasForDirectories: ['dist'],
			excludeAliasForSubDirectories: [],
			includeAliasForDirectories: {
				common: 'ui/fragments/common',
			},
		}),
	},
	include: ['src'],
	exclude: ['**/lib', 'build', '**/dist', 'node_modules', 'scripts', 'webpack', '**/templates'],
};

onmyjs(module.exports, undefined, false);
