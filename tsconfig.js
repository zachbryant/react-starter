/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const baseUrl = 'src';
const rootAlias = '@';
const excludedAliasDirs = ['dist'];
const excludedAliasSubDirs = ['components'];
const includedAliasDirs = {
	//common: 'components/common',
};

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
	let paths = {
		[`${rootAlias}/*`]: ['./*'],
		'~/*': ['../*'],
	};
	paths = getPathsFromDir(paths, '', 0, 1);
	for (let [key, value] of Object.entries(includedAliasDirs)) {
		paths = getPathAliases(value, key, paths);
	}
	return paths;
}

// Get a list of sub-directories
function getDirectories(source) {
	return fs
		.readdirSync(source, { withFileTypes: true })
		.filter((_) => _.isDirectory())
		.filter((_) => !excludedAliasDirs.includes(_))
		.map((_) => _.name);
}

function getPathsFromDir(paths, pathString, level, maxLevel) {
	if (level > maxLevel) return;

	const subDirsExcluded = excludedAliasSubDirs.some((_) => {
		return pathString.includes(_);
	});

	if (subDirsExcluded) return paths;

	for (const name of getDirectories(`${baseUrl}/${pathString}`)) {
		const newPathString = [pathString, name].filter(Boolean).join('/');
		paths = {
			...getPathAliases(newPathString, name, paths),
			...getPathsFromDir(paths, newPathString, level + 1, maxLevel),
		};
	}
	return paths;
}

function getPathAliases(newPathString, name, paths) {
	const index = `${newPathString}/index`;
	const resolvedName = resolveNameConflicts(name);
	paths[`${rootAlias}${resolvedName}/*`] = [`${newPathString}/*`, index];
	//paths[`@${name}/`] = [index];
	paths[`${rootAlias}${resolvedName}`] = [index];
	return paths;
}

function resolveNameConflicts(name) {
	switch (name) {
		case 'types':
			return 'localtypes';
		default:
			return name;
	}
}
