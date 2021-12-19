const esbuild = require('esbuild');

const config = {
    entryPoints: ['src/renderer/index.jsx'],
    bundle: true,
    outfile: 'src/app/index.js',
    minify: process.env.NODE_ENV === 'production',
    watch: process.env.WATCH === 'true',
};

esbuild.build(config)
    .catch(console.error);