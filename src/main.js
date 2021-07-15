const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const localShortcut = require('electron-localshortcut');
const Store = require('electron-store');
const dotProp = require('dot-prop');
const cjp = require('cjp');
const menhera = require('genhera');

const defaultConfig = require('./default.json');
const store = new Store();

app.on('ready', () => {
    const win = new BrowserWindow({
        width: store.get('window.width'),
        height: store.get('window.height'),
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

    win.on('maximize', () => win.webContents.send('maximize'));
    win.on('unmaximize', () => win.webContents.send('unmaximize'));
    win.on('enter-full-screen', () => win.webContents.send('enterFullScreen'));
    win.on('leave-full-screen', () => win.webContents.send('leaveFullScreen'));

    ipcMain.on('close', () => win.close());
    ipcMain.on('restore', () => win.unmaximize());
    ipcMain.on('max', () => win.maximize());
    ipcMain.on('min', () => win.minimize());
    ipcMain.on('setConfig', (e, key, value) => store.set(key, value));
    ipcMain.on('resetConfig', (e, key) => store.set(key, dotProp.get(defaultConfig, key)));
    ipcMain.handle('generateCjp', (e, str) => { return cjp.generate(str); });
    ipcMain.handle('generateMhr', (e, str) => { return menhera.generate(str); });
    ipcMain.handle('getConfig', (e, key) => { return store.get(key, dotProp.get(defaultConfig, key)); });

    ipcMain.on('contentLoaded', () => {
        win.setMenu(null);
        if (store.get('window.isMaximized')) { win.maximize(); }
        win.show();
    });

    const shortcut = {
        quit: () => win.close(),
        reload: () => win.reload(),
        fullscreen: () => win.setSimpleFullScreen(!win.isFullScreen()),
        devtools: () => win.webContents.toggleDevTools(),
        submarin: () => win.webContents.send('activateTab', 'submarin'),
        convert: () => win.webContents.send('activateTab', 'conv'),
        settings: () => win.webContents.send('activateTab', 'settings')
    };

    for (const [name, func] of Object.entries(shortcut)) {
        localShortcut.register(win, store.get(`keyBind.${name}`, dotProp.get(defaultConfig, `keyBind.${name}`)), func);
    }

    win.loadURL(`file://${__dirname}/index/index.html`);
});