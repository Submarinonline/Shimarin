const gulp = require('gulp');
const packager = require('electron-packager');

gulp.task('package-win', function(done) {
    packager({
      dir: '.', 
      out: 'out',
      arch: 'x64',
      platform: 'win32',
      electronVersion: '8.5.2',
      overwrite: true,
      icon: 'icon.ico',
      ignore: '(.gitignore|gulpfile.js|package-lock.json)',
    });
    done();
  });