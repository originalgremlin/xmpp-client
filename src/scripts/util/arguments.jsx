/*
 * Command line arguments used to launch Atom Shell.
 */
(function(undefined) {
    'use strict';

    var _ = require('lodash');

    var props = process.argv.slice(2).map(function (arg) {
        return arg.split('=');
    });

    module.exports = _.zipObject(props);
})();
