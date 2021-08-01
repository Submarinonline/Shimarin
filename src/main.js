const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const localShortcut = require('electron-localshortcut');
const Store = require('electron-store');
const dotProp = require('dot-prop');

const defaultConfig = require('./default.json');
const store = new Store();


// global keyboard shortcuts

const getGlobalKeyboardShortcuts = targetWindow => ({
    reload:         () => targetWindow.reload(),
    fullscreen:     () => targetWindow.setSimpleFullScreen(!targetWindow.isFullScreen()),
    devtools:       () => targetWindow.webContents.toggleDevTools(),
    quit:           () => app.quit(),
});


// 普段使うwindowのclass
// 主にキーボードショートカットとAPIコールを自動でつける用

class AppWindow extends BrowserWindow {
    constructor(opts) {
        super(opts);
        const globalKeyboardShortcuts = getGlobalKeyboardShortcuts(this);
        for (const name in globalKeyboardShortcuts)
            localShortcut.register(
                this,
                store.get(`keyBind.${name}`, dotProp.get(defaultConfig, `keyBind.${name}`)),
                globalKeyboardShortcuts[name]);
        ipcMain.on('enableKeyboardShortcuts',   () => localShortcut.enableAll(this));
        ipcMain.on('disableKeyboardShortcuts',  () => localShortcut.disableAll(this));
    };
};


// initializer

const loadUrl = (w, path) => {
    const distUrlPrefix = `file://${__dirname}/app/dist`
    const distUrlPrefixDev = "http://localhost:3000"

    process.env.NODE_ENV==="development"
        ? w.loadURL(`${distUrlPrefixDev}/${path}`)
        : w.loadURL(`${distUrlPrefix}/${path}`);
}

app.on('ready', () => {


    // electron ipc api

    ipcMain.handle('getConfig',         (e, key) => store.get(key, dotProp.get(defaultConfig, key)));
    ipcMain.on('setConfig',             (e, key, value) => store.set(key, value));
    ipcMain.on('resetConfig',           (e, key) => store.set(key, dotProp.get(defaultConfig, key)));


    // main window

    const mainWindow = new AppWindow({
        width: store.get('window.width'),
        height: store.get('window.height'),
        x: store.get('window.x'),
        y: store.get('window.y'),
        minWidth: 535,
        minHeight: 300,
        frame: false,
        show: false,
        title: 'Shimarin',
        icon: path.join(__dirname, '../assets/icons/icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload/mainWindow.js'),
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            nodeIntegration: false,
        }
    });
    loadUrl(mainWindow, "mainWindow.html");
    ipcMain.on('mainWindowClose',           () => mainWindow.close());
    ipcMain.on('mainWindowUnmaximize',      () => mainWindow.unmaximize());
    ipcMain.on('mainWindowMaximize',        () => mainWindow.maximize());
    ipcMain.on('mainWindowMinimize',        () => mainWindow.minimize());
    ipcMain.handle('mainWindowIsMaximized', () => mainWindow.isMaximized());
    mainWindow.on('maximize',               () => mainWindow.webContents.send('mainWindowMaximized'));
    mainWindow.on('unmaximize',             () => mainWindow.webContents.send('mainWindowUnmaximized'));
    mainWindow.on('enter-full-screen',      () => mainWindow.webContents.send('mainWindowEnteredFullScreen'));
    mainWindow.on('leave-full-screen',      () => mainWindow.webContents.send('mainWindowLeftFullScreen'));
    mainWindow.on('close', () => {
        store.set('mainWindow.width', mainWindow.getSize()[0]);
        store.set('mainWindow.height', mainWindow.getSize()[1]);
        store.set('mainWindow.x', mainWindow.getPosition()[0]);
        store.set('mainWindow.y', mainWindow.getPosition()[1]);
        store.set('mainWindow.isMaximized', mainWindow.isMaximized());
    });

    // main window keyboard shortcuts

    const mainWindowKeyboardShortcuts = {
        submarinScreen: () => mainWindow.webContents.send('moveScreen', 'submarin'),
        convertScreen:  () => mainWindow.webContents.send('moveScreen', 'conv'),
        settingsScreen: () => mainWindow.webContents.send('moveScreen', 'settings'),
    };
    for (const name in mainWindowKeyboardShortcuts)
        localShortcut.register(
            mainWindow,
            store.get(`keyBind.${name}`, dotProp.get(defaultConfig, `keyBind.${name}`)),
            mainWindowKeyboardShortcuts[name]);


    // show main window

    mainWindow.once('ready-to-show', () => {
        if (store.get('mainWindow.isMaximized')) mainWindow.maximize();
        mainWindow.setMenu(null);
        mainWindow.show()
    });
});

