module.exports = {
	mode: 'jit',
	purge: {
		content: ['./src/**/*.{html,tsx,jsx,ts,js,scss,sass,css}'],
	},
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		fontFamily: {
			sans: ['Nunito', 'sans-serif'],
		},
		extend: {
			colors: {
				primary: '#58D68D',
				secondary: '#E082B8',
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
	],
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
};
