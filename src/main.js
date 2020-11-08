const path = require('path');
const electron = require('electron');
const localShortcut = require('electron-localshortcut')

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let win = null;
let subwin = null;

app.on('ready', function () {

  win = new BrowserWindow({
    width: 1000,
    height: 800,
    'icon': path.join(__dirname, '../icon.ico'),
  });
  win.setMenu(null);
  win.setTitle('Submarin');
  win.loadURL('https://submarin.online/');

  mainShortcuts();

  win.on('closed', function () {
    win = null
    if (subwin) {
      subwin.destroy();
    }
    app.quit();
  });
});

function showSubWin() {
  if (subwin) {
    subwin.show();
    subwin.focus();
    return;
  }

  subwin = new BrowserWindow({
    'icon': path.join(__dirname, '../icon.ico'),
  });
  subwin.setMenu(null);
  subwin.setTitle('Submarin');
  subwin.loadURL(__dirname + '/henkan.html');

  subwin.on('close', (event) => {
    event.preventDefault();
    subwin.hide();
  });

  subwin.on('closed', function () {
    subwin = null;
  });
};

function mainShortcuts() {
  localShortcut.register(win, 'CommandOrControl+E', function () {
      showSubWin();
  });

  localShortcut.register(win, 'CommandOrControl+Q', function () {
      app.quit();
  });

  localShortcut.register(win, ['CommandOrControl+R', 'F5'], function () {
      win.reload();
  });

  localShortcut.register(win, 'F11', function () {
      if (win.isFullScreen()) {
          win.setSimpleFullScreen(false);
      } else {
          win.setSimpleFullScreen(true);
      }
  });

  localShortcut.register(win, 'F12', function () {
      win.openDevTools();
  })

  localShortcut.register(win, 'Alt+Left', function () {
      win.webContents.goBack();
  });

  localShortcut.register(win, 'Alt+Right', function () {
      win.webContents.goForward();
  });

  localShortcut.register(win, 'Alt+Home', function () {
      win.loadURL('https://submarin.online/');
  });
};