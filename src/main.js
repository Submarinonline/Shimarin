const path = require('path');
const electron = require('electron');
const localShortcut = require('electron-localshortcut');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

let win = null;

app.on('ready', () => {
    win = new BrowserWindow({
        width: 1000,
        height: 800,
        minWidth: 520,
        frame: false,
        'icon': path.join(__dirname, '../icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            nodeIntegration: false,
            }
    });

    win.setMenu(null);
    win.setTitle('Shimarin');
    win.loadURL(`${__dirname}/index.html`)

    win.on('closed', () => {
        win = null
        app.quit();
    });

    ipcMain.on('close', () => {
        win.close()
    })
    
    ipcMain.on('restore', () => {
        win.unmaximize()
    })
    
    ipcMain.on('max', () => {
        win.maximize()
    })
    
    ipcMain.on('min', () => {
        win.minimize()
    })

    localShortcut.register(win, 'CommandOrControl+Q', function () {
        win.close();
    });

    localShortcut.register(win, ['CommandOrControl+R', 'F5'], function () {
        win.reload();
    });

    localShortcut.register(win, 'F11', function () {
        win.setSimpleFullScreen(!win.isFullScreen());
    });

    localShortcut.register(win, 'F12', function () {
        win.openDevTools();
    })
});