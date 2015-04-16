(function(undefined) {
    var fs = require('fs'),
        spawn = require('child_process').spawn,
        _ = require('lodash');

    var child = null,
        cmd = (process.platform === 'win32') ? './extensions/elasticsearch/bin/elasticsearch.bat' : './extensions/elasticsearch/bin/elasticsearch',
        args = [],
        out = fs.createWriteStream('./var/log/elasticsearch.out', { encoding: 'UTF-8', flags: 'w' }),
        err = fs.createWriteStream('./var/log/elasticsearch.err', { encoding: 'UTF-8', flags: 'w' });

    module.exports = {
        start: function() {
            if (_.isNull(child)) {
                child = spawn(cmd, args, {stdio: ['ignore', out, err]});
            }
        },

        stop: function() {
            if (!_.isNull(child)) {
                child.kill('SIGTERM');
                child = null;
            }
        }
    };
})();
