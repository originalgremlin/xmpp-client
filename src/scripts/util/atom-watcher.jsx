(function(undefined) {
    'use strict';

    var config = require('./config.js');

    if (config.watch) {
        require('atom-watcher')();
    }
})();
