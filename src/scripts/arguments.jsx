/*
 * Command line arguments used to launch Atom Shell.
 */

var remote = require('remote'),
    _ = require('lodash');

var props = remote.process.argv.slice(2).map(function (arg) {
    return arg.split('=');
});

module.exports = _.zipObject(props);