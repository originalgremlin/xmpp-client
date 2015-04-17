(function(undefined) {
    var app = require('app'),
        BrowserWindow = require('browser-window'),
        Tray = require('./build/scripts/main/tray'),
        ApplicationMenu = require('./build/scripts/main/application-menu'),
        _ = require('lodash');

    var windows = { };

    app.on('ready', function() {
        // set up application
        ApplicationMenu.create();
        Tray.create();

        // load initial windows
        windows.main = new BrowserWindow({
            width: 800,
            height: 600,
            'min-width': 800,
            'min-height': 600,
            title: 'AeroIM',
            icon: './src/images/main/icon.png',
            type: 'desktop'
        });
        windows.main.loadUrl('file://' + __dirname + '/index.html');

        // clean up
        _.forEach(windows, function (val, key) {
            windows[key].on('closed', function() {
                windows[key] = null;
            });
        });
    });

    app.on('window-all-closed', function() {
        app.quit();
    });
})();
