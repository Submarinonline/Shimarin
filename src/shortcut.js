const localShortcut = require("electron-localshortcut");

exports.main = function (win, app) {
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
}