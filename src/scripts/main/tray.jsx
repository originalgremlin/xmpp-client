(function(undefined) {
    'use strict';

    var i18n = require('../util/i18n.js'),
        Menu = require('menu'),
        Tray = require('tray');

    module.exports = {
        create: function () {
            var tray = new Tray('./src/images/main/tray.png');
            tray.setToolTip('This is my application.');
            tray.setContextMenu(Menu.buildFromTemplate([
                {label: i18n.t('Item1'), type: 'radio'},
                {label: i18n.t('Item2'), type: 'radio'},
                {label: i18n.t('Item3'), type: 'radio', checked: true},
                {label: i18n.t('Item4'), type: 'radio'}
            ]));
        }
    };
})();