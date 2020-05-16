const electron = require('electron');
const localShortcut = require("electron-localshortcut");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {

  mainWindow = new BrowserWindow({width: 1000, height: 800, 'icon': __dirname + '/icon.ico'});
  mainWindow.setMenu(null);
  mainWindow.setTitle("Submarin");
  mainWindow.loadURL('https://submarin.online/');

  shortcut();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

function shortcut() {
  localShortcut.register(mainWindow, 'CommandOrControl+Q', function() {
    app.quit();
  });

  localShortcut.register(mainWindow, ['CommandOrControl+R', 'F5'], function() {
    mainWindow.reload()
  });

  localShortcut.register(mainWindow, 'F11', function() {
    if (mainWindow.isFullScreen()) {
      mainWindow.setSimpleFullScreen(false)
    } else {
      mainWindow.setSimpleFullScreen(true)
    }
  });

  localShortcut.register(mainWindow, 'Alt+Left', function() {
    mainWindow.webContents.goBack()
  });

  localShortcut.register(mainWindow, 'Alt+Right', function() {
    mainWindow.webContents.goForward()
  });

  localShortcut.register(mainWindow, 'CommandOrControl+H', function() {
    mainWindow.loadURL('https://sites.google.com/view/submarin/top');
  });

  localShortcut.register(mainWindow, 'Alt+Home', function() {
    mainWindow.loadURL('https://submarin.online/');
  });
}