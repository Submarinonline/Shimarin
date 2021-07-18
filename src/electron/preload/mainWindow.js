const { contextBridge, ipcRenderer } = require('electron');


// electron ipc api

contextBridge.exposeInMainWorld(
    'electron',
    {
        getConfig:                  (key) => ipcRenderer.invoke('getConfig', key),
        setConfig:                  (key, val) => ipcRenderer.send('setConfig', key, val),
        resetConfig:                (key) => ipcRenderer.send('resetConfig', key),
        enableKeyboardShortcuts:    () => ipcRenderer.send('enableKeyboardShortcuts'),
        disableKeyboardShortcuts:   () => ipcRenderer.send('disableKeyboardShortcuts'),
    }
);


// main window

// todo: on(moveScreen)

contextBridge.exposeInMainWorld(
    'mainWindow',
    {
        close:          () => ipcRenderer.send('mainWindowClose'),
        maximize:       () => ipcRenderer.send('mainWindowMaximize'),
        unmaximize:     () => ipcRenderer.send('mainWindowUnmaximize'),
        minimize:       () => ipcRenderer.send('mainWindowMinimize'),
        isMaximized:    () => ipcRenderer.invoke('mainWindowIsMaximized'),

        onChangeScreen:         (func) => ipcRenderer.on('mainWindowChangeScreen', (_, id) => func(id)),
        onMaximize:             (func) => ipcRenderer.on('mainWindowMaximized', () => func()),
        onUnmaximize:           (func) => ipcRenderer.on('mainWindowUnmaximized', () => func()),
        onEnteredFullScreen:    (func) => ipcRenderer.on('mainWindowEnteredFullScreen', () => func()),
        onLeftFullScreen:       (func) => ipcRenderer.on('mainWindowLeftFullScreen', () => func()),
    }
);