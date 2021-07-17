const esbuild = require('esbuild');

const config = {
    entryPoints: ['src/react/App.jsx'],
    bundle: true,
    outfile: 'src/electron/pub/app.js',
    minify: process.env.NODE_ENV === 'production',
    watch: process.env.WATCH === 'true',
};

esbuild.build(config)
    .catch(console.error);