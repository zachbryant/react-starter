module.exports = {
    purge: {
        content: [
            './src/**/*.html',
            './src/**/*.tsx',
            './src/**/*.scss',
            './src/**/*.css',
            './src/**/*.ts',
        ],
    },
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
