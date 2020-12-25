const path = require('path');
const electron = require('electron');
const localShortcut = require('electron-localshortcut');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let win = null;

app.on('ready', function () {
    win = new BrowserWindow({
        width: 1000,
        height: 800,
        frame: false,
        'icon': path.join(__dirname, '../icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            }
    });
    win.setMenu(null);
    win.setTitle('Submarin');
    win.loadURL(`${__dirname}/index.html`)

    mainShortcuts();

    win.on('closed', function () {
        win = null
        app.quit();
    });
});

function mainShortcuts() {
    localShortcut.register(win, 'CommandOrControl+Q', function () {
        app.quit();
    });

    localShortcut.register(win, ['CommandOrControl+R', 'F5'], function () {
        win.reload();
    });

    localShortcut.register(win, 'F11', function () {
        if (win.isFullScreen()) {
            win.setSimpleFullScreen(false);
        } else {
            win.setSimpleFullScreen(true);
        }
    });

    localShortcut.register(win, 'F12', function () {
        win.openDevTools();
    })
};