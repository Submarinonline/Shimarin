const gulp = require('gulp');
const packager = require('electron-packager');

const windows = {
    dir: '.',
    out: 'out',
    arch: 'x64',
    platform: 'win32',
    overwrite: true,
    icon: 'icon/icon.ico',
    ignore: '(.gitignore|gulpfile.js|package-lock.json|.eslintrc.js)',
};

const linux = {
    dir: '.',
    out: 'out',
    arch: 'x64',
    platform: 'linux',
    overwrite: true,
    icon: 'icon/icon.png',
    ignore: '(.gitignore|gulpfile.js|package-lock.json|.eslintrc.js)',
};

gulp.task('package', function (done) {
    packager(windows);
    packager(linux);
    done();
});