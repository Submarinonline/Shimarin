const electron = require('electron');
const shortcut = require(__dirname + '/shortcut.js')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let win = null;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {

  win = new BrowserWindow({
    width: 1000,
    height: 800,
    'icon': __dirname + '/icon.ico',
  });
  win.setMenu(null);
  win.setTitle("Submarin");
  win.loadURL('https://submarin.online/');

  shortcut.main(win, app);

  win.on('closed', function () {
    win = null;
  });
});