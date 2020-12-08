const fs = require( 'fs' );

const baseUrl = 'src';

// Import aliases like `import("@Public/img/myasset.png")`
function generateIntellisensePaths() {
    const paths = {
        '@/*': ['./*'],
        '~/*': ['../*'],
    };

    const dir = await fs.promises.opendir( baseUrl );
    for await ( const dirent of dir ) {
        if ( dirent.isDirectory ) {
            let name = dirent.name;
            paths[`@${name}/*`] = `${name}/*`
            paths[`@${name}/`] = `${name}/index`
            paths[`@${name}`] = `${name}/index`
        }
    }
    return paths;
}

const exports = {
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
    exclude: [
        'lib',
        'build',
        'node_modules',
        'scripts',
        'webpack',
        'jest',
        'tests',
        'templates',
    ],
};

module.exports = exports;