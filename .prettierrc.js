module.exports = {
	printWidth: 100,
	singleQuote: true,
	trailingComma: 'es5',
	useTabs: true,
	proseWrap: 'never',
	overrides: [
		{
			files: '*.md',
			options: {
				printWidth: 70,
				useTabs: false,
				semi: false,
				trailingComma: 'none',
				arrowParens: 'avoid',
				proseWrap: 'never',
			},
		},
		{
			files: '*.{json,babelrc,eslintrc,remarkrc,prettierrc}',
			options: {
				useTabs: false,
			},
		},
	],
};

