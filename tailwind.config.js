module.exports = {
	purge: {
		content: [
			'./src/**/*.html',
			'./src/**/*.tsx',
			'./src/**/*.ts',
			'./src/**/*.scss',
			'./src/**/*.sass',
			'./src/**/*.css',
		],
	},
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		fontFamily: {
			display: ['serif'],
			body: ['sans-serif'],
		},
		extend: {
			colors: {
				primary: '#58D68D',
				secondary: '#E082B8',
			},
		},
	},
	variants: {},
	plugins: [],
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
};
