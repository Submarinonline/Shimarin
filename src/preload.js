const { contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld(
    'api',
    {
        close: () => ipcRenderer.send('close'),
        restore: () => ipcRenderer.send('restore'),
        max: () => ipcRenderer.send('max'),
        min: () => ipcRenderer.send('min'),
        onMaximize: (func) => ipcRenderer.on('onMaximize', () => func()),
        onUnmaximize: (func) => ipcRenderer.on('unMaximize', () => func())
    }
)