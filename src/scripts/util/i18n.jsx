(function(undefined) {
    'use strict';

    var Polyglot = require('node-polyglot');

    var polyglot = new Polyglot({
        locale: navigator.userLanguage || navigator.languages[0] || navigator.language
    });

    // TODO: download translation list from the server synchronously
    polyglot.extend({
        test: '__TEST I18N__'
    });

    module.exports = polyglot;
})();