const esbuild = require('esbuild');

const config = {
    entryPoints: ['src/renderer/index.jsx'],
    bundle: true,
    outfile: 'app/index.js',
    minify: false,
    watch: process.env.WATCH === 'true',
};

esbuild.build(config)
    .catch(console.error);