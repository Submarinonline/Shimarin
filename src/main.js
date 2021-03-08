const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const localShortcut = require('electron-localshortcut');
const Store = require('electron-store');
const cjp = require('cjp');
const menhera = require('genhera');

const config = require('./config.json');

let win = null;
let store = new Store();

function getKey(key) {
    if (!store.has(`key.${key}`)) store.set(`key.${key}`, config.key[key]);
    return store.get(`key.${key}`);
}

app.on('ready', () => {
    win = new BrowserWindow({
        width: store.get('window.width', 1000),
        height: store.get('window.height', 800),
        x: store.get('window.x'),
        y: store.get('window.y'),
        minWidth: 535,
        minHeight: 300,
        frame: false,
        show: false,
        title: 'Shimarin',
        icon: path.join(__dirname, '../icon/icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            nodeIntegration: false,
        }
    });

    win.on('close', () => {
        store.set('window.width', win.getSize()[0]);
        store.set('window.height', win.getSize()[1]);
        store.set('window.x', win.getPosition()[0]);
        store.set('window.y', win.getPosition()[1]);
        store.set('window.isMaximized', win.isMaximized());
    });

    win.on('closed', () => {
        win = null;
        app.quit();
    });

    win.on('maximize', () => win.webContents.send('maximize'));

    win.on('unmaximize', () => win.webContents.send('unmaximize'));

    win.on('enter-full-screen', () => win.webContents.send('enterFullScreen'));

    win.on('leave-full-screen', () => win.webContents.send('leaveFullScreen'));

    ipcMain.on('close', () => win.close());

    ipcMain.on('restore', () => win.unmaximize());

    ipcMain.on('max', () => win.maximize());

    ipcMain.on('min', () => win.minimize());

    ipcMain.handle('genCjp', (e, str) => { return cjp.generate(str); });

    ipcMain.handle('genMhr', (e, str) => { return menhera.generate(str); });

    ipcMain.on('contentLoaded', () => {
        win.setMenu(null);
        if (store.get('window.isMaximized')) { win.maximize(); }
        win.show();
    });

    localShortcut.register(win, getKey('quit'), function () { win.close(); });

    localShortcut.register(win, getKey('reload'), function () { win.reload(); });

    localShortcut.register(win, getKey('fullscreen'), function () { win.setSimpleFullScreen(!win.isFullScreen()); });

    localShortcut.register(win, getKey('devtools'), function () { win.webContents.toggleDevTools(); });

    win.loadURL(`file://${__dirname}/index.html`);
});