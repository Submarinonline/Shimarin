const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'api',
    {
        //windowClose: () => ipcRenderer.send('window-close'),
        //windowUnmaximize: () => ipcRenderer.send('window-unmaximize'),
        //windowMaximize: () => ipcRenderer.send('window-maximize'),
        //windowMinimize: () => ipcRenderer.send('window-minimize'),

        //onWindowMaximize: (func) => ipcRenderer.on('window-maximize', () => func()),
        //onWindowUnmaximize: (func) => ipcRenderer.on('window-unmaximize', () => func()),

        onEnterFullScreen: (func) => ipcRenderer.on('enter-full-screen', () => func()),
        onLeaveFullScreen: (func) => ipcRenderer.on('leave-full-screen', () => func()),

        setConfig: (key, value) => ipcRenderer.send('set-config', key, value),
        resetConfig: (key) => ipcRenderer.send('reset-config', key),
        getConfig: (key) => ipcRenderer.invoke('get-config', key),

        registerShortcut: (accelerator, key) => ipcRenderer.send('register-shortcut', accelerator, key),
        unregisterShortcut: (accelerator, key) => ipcRenderer.send('unregister-shortcut', accelerator, key),

        disableShortcuts: () => ipcRenderer.send('disable-shortcuts'),
        enableShortcuts: () => ipcRenderer.send('enable-shortcuts'),
    }
);