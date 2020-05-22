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
    mainWindow.loadURL('https://about.submarin.online');
  });

  localShortcut.register(mainWindow, 'CommandOrControl+Shift+H', function() {
    mainWindow.loadURL('https://github.com/shaaaaaQ/Shimarin/blob/master/README.md');
  });

  localShortcut.register(mainWindow, 'Alt+Home', function() {
    mainWindow.loadURL('https://submarin.online/');
  });

  localShortcut.register(mainWindow, 'CommandOrControl+E', function() {
    subWindow = new BrowserWindow({width: 700, height: 500, 'icon': __dirname + '/icon.ico'});
    subWindow.setMenu(null);
    subWindow.setTitle("怪レい日本语");
    subWindow.loadURL('file://' + __dirname + '/henkan.html');

    localShortcut.register(subWindow, 'CommandOrControl+Q', function() {
      subWindow.close()
    });
  
    localShortcut.register(subWindow, ['CommandOrControl+R', 'F5'], function() {
      subWindow.reload()
    });
  
    localShortcut.register(subWindow, 'F11', function() {
      if (subWindow.isFullScreen()) {
        subWindow.setSimpleFullScreen(false)
      } else {
        subWindow.setSimpleFullScreen(true)
      }
    });
  });
}