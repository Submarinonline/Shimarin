const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'api',
    {
        contentLoaded: () => ipcRenderer.send('contentLoaded'),
        close: () => ipcRenderer.send('close'),
        restore: () => ipcRenderer.send('restore'),
        max: () => ipcRenderer.send('max'),
        min: () => ipcRenderer.send('min'),
        setConfig: (key, value) => ipcRenderer.send('setConfig', key, value),
        genCjp: (str) => ipcRenderer.invoke('genCjp', str),
        genMhr: (str) => ipcRenderer.invoke('genMhr', str),
        getConfig: (key) => ipcRenderer.invoke('getConfig', key),
        maximize: (func) => ipcRenderer.on('maximize', () => func()),
        unmaximize: (func) => ipcRenderer.on('unmaximize', () => func()),
        enterFullScreen: (func) => ipcRenderer.on('enterFullScreen', () => func()),
        leaveFullScreen: (func) => ipcRenderer.on('leaveFullScreen', () => func()),
        activateTab: (func) => ipcRenderer.on('activateTab', (e, name) => func(name)),
    }
);