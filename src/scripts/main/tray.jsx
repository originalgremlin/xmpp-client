(function(undefined) {
    'use strict';

    var Menu = require('menu'),
        Tray = require('tray');

    module.exports = {
        create: function () {
            var tray = new Tray('./src/images/aerofs_logo.png');
            tray.setToolTip('This is my application.');
            tray.setContextMenu(Menu.buildFromTemplate([
                {label: 'Item1', type: 'radio'},
                {label: 'Item2', type: 'radio'},
                {label: 'Item3', type: 'radio', checked: true},
                {label: 'Item4', type: 'radio'}
            ]));
        }
    };
})();