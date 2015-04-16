(function(undefined) {
    var app = require('app'),
        elasticsearch = require('./build/scripts/extensions/elasticsearch'),
        BrowserWindow = require('browser-window'),
        Tray = require('./build/scripts/main/tray'),
        ApplicationMenu = require('./build/scripts/main/application-menu'),
        _ = require('lodash');

    var extensions = { elasticsearch: elasticsearch },
        windows = { };

    app.on('ready', function() {
        // set up application
        ApplicationMenu.create();
        Tray.create();

        // enable extensions
        _.forEach(extensions, function (extension, name) {
            console.log('Starting ' + name + '...');
            extension.start();
        });

        // load initial windows
        windows.main = new BrowserWindow({
            width: 800,
            height: 600,
            'min-width': 800,
            'min-height': 600,
            title: 'AeroIM',
            icon: './src/images/aerofs_logo.png',
            type: 'desktop'
        });
        windows.main.loadUrl('file://' + __dirname + '/index.html');

        _.forEach(windows, function (val, key) {
            windows[key].on('closed', function() {
                windows[key] = null;
            });
        });
    });

    app.on('window-all-closed', function() {
        // disable extensions
        _.forEach(extensions, function (extension, name) {
            console.log('Stopping ' + name + '...');
            extension.stop();
        });

        // close up shop
        app.quit();
    });
})();
