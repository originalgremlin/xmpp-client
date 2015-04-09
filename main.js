var app = require('app'),
    BrowserWindow = require('browser-window'),
    _ = require('lodash');

var windows = { };

app.on('ready', function() {
    windows.main = new BrowserWindow({ width: 800, height: 600 });
    windows.main.loadUrl('file://' + __dirname + '/index.html');

    _.forEach(windows, function (val, key) {
        windows[key].on('closed', function() {
            windows[key] = null;
        });
    });
});

app.on('window-all-closed', function() {
    app.quit();
});
