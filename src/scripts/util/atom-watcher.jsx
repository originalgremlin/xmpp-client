(function(undefined) {
    var config = require('./config.js');

    if (config.watch) {
        require('atom-watcher')();
    }
})();
