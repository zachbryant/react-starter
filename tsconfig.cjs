/* eslint-disable @typescript-eslint/no-var-requires */
const { generatePaths } = require('tsconfig-paths-autogen');
const { onmyjs } = require('onmyjs');

const baseUrl = 'src';

module.exports = {
	compilerOptions: {
		lib: ['dom', 'dom.iterable', 'esnext'],
		allowJs: true,
		skipLibCheck: true,
		esModuleInterop: true,
		allowSyntheticDefaultImports: true,
		exactOptionalPropertyTypes: true,
		noImplicitReturns: true,
		strict: true,
		structNullChecks: true,
		forceConsistentCasingInFileNames: true,
		target: 'es6',
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
	include: ['src', './jest-setup.ts'],
	exclude: ['**/lib', 'build', '**/dist', 'node_modules', 'scripts', 'webpack', '**/templates'],
};

onmyjs(module.exports, undefined, false);
