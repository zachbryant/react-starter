/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const baseUrl = 'src';

module.exports = {
	compilerOptions: {
		target: 'es2020',
		lib: ['dom', 'dom.iterable', 'esnext'],
		allowJs: true,
		skipLibCheck: true,
		esModuleInterop: true,
		allowSyntheticDefaultImports: true,
		noImplicitReturns: true,
		strict: true,
		forceConsistentCasingInFileNames: true,
		module: 'es2020',
		moduleResolution: 'node',
		resolveJsonModule: true,
		isolatedModules: true,
		noEmit: false,
		jsx: 'react',
		newLine: 'lf',
		baseUrl,
		paths: generateIntellisensePaths(),
	},
	include: ['src'],
	exclude: ['lib', 'build', 'node_modules', 'scripts', 'webpack', 'jest', 'tests', 'templates'],
};

// Import aliases like `import("@Public/img/myasset.png")`
function generateIntellisensePaths() {
	const paths = {
		'@/*': ['./*'],
		'~/*': ['../*'],
	};
	return getPathsFromDir(paths, '', 0, 1);
}

// Get a list of sub-directories
function getDirectories(source) {
	return fs
		.readdirSync(source, { withFileTypes: true })
		.filter((_) => _.isDirectory())
		.filter((_) => _ !== 'dist')
		.map((_) => _.name);
}

function getPathsFromDir(paths, pathString, level, maxLevel) {
	if (level > maxLevel) return;

	for (const name of getDirectories(`${baseUrl}/${pathString}`)) {
		const newPathString = [pathString, name].filter(Boolean).join('/');
		const index = `${newPathString}/index`;
		paths[`@${name}/*`] = [`${newPathString}/*`, index];
		//paths[`@${name}/`] = [index];
		paths[`@${name}`] = [index];
		paths = {
			...paths,
			...getPathsFromDir(paths, newPathString, level + 1, maxLevel),
		};
	}
	return paths;
}
