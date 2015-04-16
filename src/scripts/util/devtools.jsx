/*
 * Not currently working, though may be in the future
 * https://github.com/atom/atom-shell/issues/915
 */
(function(undefined) {
    'use strict';

    var BrowserWindow = require('remote').require('browser-window'),
        config = require('./config.js');

    if (config.debug) {
        BrowserWindow.addDevToolsExtension('./node_modules/react-devtools');
    }
})();
