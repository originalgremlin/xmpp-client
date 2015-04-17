(function(undefined) {
    var chokidar = require('chokidar'),
        elasticsearch = require('elasticsearch'),
        fs = require('fs'),
        path = require('path'),
        spawn = require('child_process').spawn,
        _ = require('lodash');

    var server = null,
        client = null,
        watcher = null;

    /*** elasticsearch server ***/
    var cmd = (process.platform === 'win32') ? './extensions/elasticsearch/bin/elasticsearch.bat' : './extensions/elasticsearch/bin/elasticsearch',
        args = ["-Des.config=./etc/elasticsearch.yml"],
        out = fs.createWriteStream('./var/log/elasticsearch.out', { encoding: 'utf8', flags: 'w' }),
        err = fs.createWriteStream('./var/log/elasticsearch.err', { encoding: 'utf8', flags: 'w' });

    var startServer = function() {
        if (_.isNull(server)) {
            server = spawn(cmd, args, {stdio: ['ignore', out, err]});
        }
    };

    var stopServer = function() {
        if (!_.isNull(server)) {
            server.kill('SIGTERM');
            server = null;
        }
    };

    /*** elasticsearch client ***/
    var index = 'aerofs',
        type = 'file';

    var startClient = function() {
        if (_.isNull(client)) {
            client = new elasticsearch.Client();
            client.ping({
                maxRetries: 5,
                requestTimeout: 30000
            }, function (err, response, status) {
                if (err) {
                    console.error(err);
                    return;
                }
                client.indices.create({
                    body: index
                }, function(err, response, status) {
                    console.log(err, response, status);
                });
                client.indices.putMapping({
                    index: index,
                    type: type,
                    ignoreConflicts: true,
                    body: {
                        attachment: { type: "attachment" }
                    }
                }, function(err, response, status) {
                    console.log(err, response, status);
                });
            });
        }
    }

    var stopClient = function() {
        if (!_.isNull(client)) {
            client = null;
        }
    };

    /*** file watching and indexing ***/
    var home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
        aero = path.join(home, 'AeroFS'),
        root = fs.existsSync(aero) ? aero : home;

    var startWatcher = function() {
        if (_.isNull(watcher)) {
            client.ping({
                maxRetries: 5,
                requestTimeout: 30000
            }, function(err, response, status) {
                if (err) {
                    console.error(err);
                    return;
                }
                watcher = chokidar.watch(root, { ignoreInitial: true });
                watcher.on('add', function(path, stats) {
                    fs.readFile(path, function(err, data) {
                        if (err) {
                            console.error('ADD', err);
                            return;
                        }
                        client.create({
                            index: index,
                            type: type,
                            id: path,
                            body: {
                                path: path,
                                size: stats.size,
                                createdAt: stats.birthtime,
                                modifiedAt: stats.mtime,
                                attachment: new Buffer(data, 'binary').toString('base64')
                            }
                        }, function (err, response, status) {
                            console.log('ADD', err, response, status);
                        });
                    });
                });
                watcher.on('change', function(path, stats) {
                    fs.readFile(path, function(err, data) {
                        if (err) {
                            console.error('CHANGE', err);
                            return;
                        }
                        client.update({
                            index: index,
                            type: type,
                            id: path,
                            body: {
                                doc: {
                                    size: stats.size,
                                    modifiedAt: stats.mtime,
                                    attachment: new Buffer(data, 'binary').toString('base64')
                                }
                            }
                        }, function(err, response, status) {
                            console.log('CHANGE', err, response, status);
                        });
                    });
                });
                watcher.on('unlink', function(path) {
                    client.delete({
                        index: index,
                        type: type,
                        id: path
                    }, function(err, response, status) {
                        console.log('UNLINK', err, response, status);
                    });
                });
            });
        }
    };

    var stopWatcher = function() {
        if (!_.isNull(watcher)) {
            watcher.close();
            watcher = null;
        }
    };

    module.exports = {
        start: function() {
            startServer();
            startClient();
            startWatcher();
        },

        stop: function() {
            stopWatcher();
            stopClient();
            stopServer();
        }
    };
})();
