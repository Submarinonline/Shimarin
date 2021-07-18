const esbuild = require('esbuild');

// const configs = [
//     {
//      ...
//     }
// ];

// tasks = configs.map(
//     config => () => esbuild.build(config));

// Promise.all(tasks)
//     .catch(console.error);

const config = {
    entryPoints: ['src/react/mainWindow.jsx'],
    bundle: true,
    outfile: 'src/electron/app/mainWindow.js',
    minify: process.env.NODE_ENV === 'production',
    watch: process.env.WATCH === 'true',
}

esbuild.build(config)
    .catch(console.error)