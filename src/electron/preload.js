const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'ipcApi',
    {
        // appReady:           () => ipcRenderer.send('appReady'),
        closeWindow:        () => ipcRenderer.send('closeWindow'),
        unmaximizeWindow:   () => ipcRenderer.send('unmaximizeWindow'),
        maximizeWindow:     () => ipcRenderer.send('maximizeWindow'),
        minimizeWindow:     () => ipcRenderer.send('minimizeWindow'),
        getConfig:          (key) => ipcRenderer.invoke('getConfig', key),
        setConfig:          (key, val) => ipcRenderer.send('setConfig', key, val),
        resetConfig:        (key) => ipcRenderer.send('resetConfig', key),
        disableKeyboardShortcuts:   () => ipcRenderer.send('disableKeyboardShortcuts'),
        enableKeyboardShortcuts:    () => ipcRenderer.send('enableKeyboardShortcuts'),

        onMoveScreen:               (func) => ipcRenderer.on('moveScreen', (_, id) => func(id)),
        onWindowMaximize:           (func) => ipcRenderer.on('windowMaximized', () => func()),
        onWindowUnmaximize:         (func) => ipcRenderer.on('windowUnmaximized', () => func()),
        onWindowEnteredFullScreen:  (func) => ipcRenderer.on('windowEnteredFullScreen', () => func()),
        onWindowLeftFullScreen:     (func) => ipcRenderer.on('windowLeftFullScreen', () => func()),
    }
);