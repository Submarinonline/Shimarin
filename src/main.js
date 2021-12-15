const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const localShortcut = require('electron-localshortcut');
const Store = require('electron-store');
const dotProp = require('dot-prop');

const defaultConfig = require('./default.json');
const store = new Store();

app.on('ready', () => {
    const win = new BrowserWindow({
        width: store.get('window.width', dotProp.get(defaultConfig, 'window.width')),
        height: store.get('window.height', dotProp.get(defaultConfig, 'window.height')),
        x: store.get('window.x'),
        y: store.get('window.y'),
        //minWidth: 535,
        //minHeight: 300,
        frame: !store.get('customTitleBar', dotProp.get(defaultConfig, 'customTitleBar')),
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

    //ipcMain.on('window-close', () => win.close());
    //ipcMain.on('window-unmaximize', () => win.unmaximize());
    //ipcMain.on('window-maximize', () => win.maximize());
    //ipcMain.on('window-minimize', () => win.minimize());

    //win.on('maximize', () => win.webContents.send('window-maximize'));
    //win.on('unmaximize', () => win.webContents.send('window-unmaximize'));

    win.on('enter-full-screen', () => win.webContents.send('enter-full-screen'));
    win.on('leave-full-screen', () => win.webContents.send('leave-full-screen'));

    ipcMain.on('set-config', (e, key, value) => store.set(key, value));
    ipcMain.on('reset-config', (e, key) => store.set(key, dotProp.get(defaultConfig, key)));
    ipcMain.handle('get-config', (e, key) => { return store.get(key, dotProp.get(defaultConfig, key)); });

    ipcMain.on('register-shortcut', (e, accelerator, key) => localShortcut.register(win, accelerator, shortcuts[key]));
    ipcMain.on('unregister-shortcut', (e, accelerator, key) => localShortcut.unregister(win, accelerator, shortcuts[key]));

    ipcMain.on('disable-shortcuts', () => localShortcut.disableAll(win));
    ipcMain.on('enable-shortcuts', () => localShortcut.enableAll(win));

    win.once('ready-to-show', () => {
        win.setMenu(null);
        if (store.get('window.isMaximized')) { win.maximize(); }
        win.show();
    });

    // register shortcuts
    for (const [key, func] of Object.entries(shortcuts)) {
        localShortcut.register(win, store.get(key, dotProp.get(defaultConfig, key)), func);
    }

    win.loadURL(`file://${path.join(__dirname, '../app/index.html')}`);
});