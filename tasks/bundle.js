const esbuild = require('esbuild');

const config = {
    entryPoints: ['src/renderer/index.jsx'],
    bundle: true,
    outfile: 'app/index.js',
    minify: true,
    watch: process.env.WATCH === 'true',
};

esbuild.build(config)
    .catch(console.error);