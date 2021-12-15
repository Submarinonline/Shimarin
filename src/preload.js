const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'api',
    {
        //close: () => ipcRenderer.send('close'),
        //restore: () => ipcRenderer.send('restore'),
        //max: () => ipcRenderer.send('max'),
        //min: () => ipcRenderer.send('min'),

        //maximize: (func) => ipcRenderer.on('maximize', () => func()),
        //unmaximize: (func) => ipcRenderer.on('unmaximize', () => func()),
        //enterFullScreen: (func) => ipcRenderer.on('enterFullScreen', () => func()),
        //leaveFullScreen: (func) => ipcRenderer.on('leaveFullScreen', () => func()),

        setConfig: (key, value) => ipcRenderer.send('setConfig', key, value),
        resetConfig: (key) => ipcRenderer.send('resetConfig', key),
        getConfig: (key) => ipcRenderer.invoke('getConfig', key),

        registerShortcut: (accelerator, key) => ipcRenderer.send('registerShortcut', accelerator, key),
        unregisterShortcut: (accelerator, key) => ipcRenderer.send('unregisterShortcut', accelerator, key),

        disableShortcuts: () => ipcRenderer.send('disableShortcuts'),
        enableShortcuts: () => ipcRenderer.send('enableShortcuts'),
    }
);