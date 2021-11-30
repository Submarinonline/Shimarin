const packager = require('electron-packager');

const opt = {
    dir: '.',
    out: 'out',
    arch: 'x64',
    platform: 'win32',
    overwrite: true,
    icon: 'assets/icon.ico',
    ignore: '(.vscode|.gitignore|tasks|package-lock.json|.eslintrc.js)',
};

packager(opt);

/*const linux = {
    dir: '.',
    out: 'out',
    arch: 'x64',
    platform: 'linux',
    overwrite: true,
    icon: 'icon/icon.png',
    ignore: '(.vscode|.gitignore|tasks|package-lock.json|.eslintrc.js)',
};*/
//packager(linux);