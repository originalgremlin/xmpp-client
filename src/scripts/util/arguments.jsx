/*
 * Command line arguments used to launch Atom Shell.
 */
(function(undefined) {
    var _ = require('lodash');

    var props = process.argv.slice(2).map(function (arg) {
        return arg.split('=');
    });

    module.exports = _.zipObject(props);
})();
