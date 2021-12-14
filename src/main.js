const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const localShortcut = require('electron-localshortcut');
const Store = require('electron-store');
const dotProp = require('dot-prop');

const defaultConfig = require('./default.json');
const store = new Store();

app.on('ready', () => {
    const win = new BrowserWindow({
        width: store.get('window.width'),
        height: store.get('window.height'),
        x: store.get('window.x'),
        y: store.get('window.y'),
        //minWidth: 535,
        //minHeight: 300,
        //frame: false,
        show: false,
        title: 'Shimarin',
        icon: path.join(__dirname, '../assets/icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        }
    });

    const shortcuts = {
        'keyBind.quit': () => win.close(),
        'keyBind.reload': () => win.reload(),
        'keyBind.fullscreen': () => win.setSimpleFullScreen(!win.isFullScreen()),
        'keyBind.devtools': () => win.webContents.toggleDevTools()
    };

    win.on('close', () => {
        if (!(win.isMaximized() || win.isFullScreen())) {
            store.set('window.width', win.getSize()[0]);
            store.set('window.height', win.getSize()[1]);
            store.set('window.x', win.getPosition()[0]);
            store.set('window.y', win.getPosition()[1]);
        }
        store.set('window.isMaximized', win.isMaximized());
    });

    //win.on('maximize', () => win.webContents.send('maximize'));
    //win.on('unmaximize', () => win.webContents.send('unmaximize'));
    //win.on('enter-full-screen', () => win.webContents.send('enterFullScreen'));
    //win.on('leave-full-screen', () => win.webContents.send('leaveFullScreen'));

    //ipcMain.on('close', () => win.close());
    //ipcMain.on('restore', () => win.unmaximize());
    //ipcMain.on('max', () => win.maximize());
    //ipcMain.on('min', () => win.minimize());

    ipcMain.on('setConfig', (e, key, value) => store.set(key, value));
    ipcMain.on('resetConfig', (e, key) => store.set(key, dotProp.get(defaultConfig, key)));
    ipcMain.handle('getConfig', (e, key) => { return store.get(key, dotProp.get(defaultConfig, key)); });

    ipcMain.on('disableShortcuts', () => localShortcut.disableAll(win));
    ipcMain.on('enableShortcuts', () => localShortcut.enableAll(win));

    win.once('ready-to-show', () => {
        win.setMenu(null);
        if (store.get('window.isMaximized')) { win.maximize(); }
        win.show();
    });

    for (const [key, func] of Object.entries(shortcuts)) {
        localShortcut.register(win, store.get(key, dotProp.get(defaultConfig, key)), func);
    }

    win.loadURL(`file://${path.join(__dirname, '../app/index.html')}`);
});