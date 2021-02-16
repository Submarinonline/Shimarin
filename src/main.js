const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const localShortcut = require('electron-localshortcut');

let win = null;

app.on('ready', () => {
    win = new BrowserWindow({
        width: 1000,
        height: 800,
        minWidth: 535,
        frame: false,
        'icon': path.join(__dirname, '../icon/icon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            nodeIntegration: false,
        }
    });

    win.setMenu(null);
    win.setTitle('Shimarin');
    win.loadURL(`${__dirname}/index.html`);

    win.on('closed', () => {
        win = null;
        app.quit();
    });

    win.on('maximize', () => {
        win.webContents.send('maximize');
    });

    win.on('unmaximize', () => {
        win.webContents.send('unmaximize');
    });

    win.on('enter-full-screen', () => {
        win.webContents.send('enterFullScreen');
    });

    win.on('leave-full-screen', () => {
        win.webContents.send('leaveFullScreen');
    });

    ipcMain.on('close', () => {
        win.close();
    });
    
    ipcMain.on('restore', () => {
        win.unmaximize();
    });
    
    ipcMain.on('max', () => {
        win.maximize();
    });
    
    ipcMain.on('min', () => {
        win.minimize();
    });

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
        win.webContents.toggleDevTools();

    });
});