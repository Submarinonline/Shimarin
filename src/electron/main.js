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

    win.on('maximize',              () => win.webContents.send('windowMaximized'));
    win.on('unmaximize',            () => win.webContents.send('windowUnmaximized'));
    win.on('enter-full-screen',     () => win.webContents.send('windowEnteredFullScreen'));
    win.on('leave-full-screen',     () => win.webContents.send('windowLeftFullScreen'));

    ipcMain.on('closeWindow',       () => win.close());
    ipcMain.on('unmaximizeWindow',  () => win.unmaximize());
    ipcMain.on('maximizeWindow',    () => win.maximize());
    ipcMain.on('minimizeWindow',    () => win.minimize());

    ipcMain.handle('getConfig',     (e, key) => store.get(key, dotProp.get(defaultConfig, key)));
    ipcMain.on('setConfig',         (e, key, value) => store.set(key, value));
    ipcMain.on('resetConfig',       (e, key) => store.set(key, dotProp.get(defaultConfig, key)));

    ipcMain.on('disableKeyboardShortcuts',  () => localShortcut.disableAll(win));
    ipcMain.on('enableKeyboardShortcuts',   () => localShortcut.enableAll(win));

    // ipcMain.on('appReady', () => {
    //     if (store.get('window.isMaximized')) win.maximize();
    //     win.setMenu(null);
    //     win.show();
    // });
    win.once('ready-to-show', () => {
        if (store.get('window.isMaximized')) win.maximize();
        win.setMenu(null);
        win.show()
    });

    const keyboardShortcut = {
        quit:           () => win.close(),
        reload:         () => win.reload(),
        fullscreen:     () => win.setSimpleFullScreen(!win.isFullScreen()),
        devtools:       () => win.webContents.toggleDevTools(),
        submarinScreen: () => win.webContents.send('moveScreen', 'submarin'),
        convertScreen:  () => win.webContents.send('moveScreen', 'conv'),
        settingsScreen: () => win.webContents.send('moveScreen', 'settings'),
    };
    for (const name in keyboardShortcut)
        localShortcut.register(
            win,
            store.get(`keyBind.${name}`, dotProp.get(defaultConfig, `keyBind.${name}`)),
            keyboardShortcut[name]);

    win.loadURL(`file://${__dirname}/app/index.html`);
});
