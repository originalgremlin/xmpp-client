(function(undefined) {
    'use strict';

    var _ = require('lodash');

    var settings = {
        get: function(key, defaultValue) {
            return _.get(localStorage, key, defaultValue);
        },

        set: function(key, value) {
            localStorage[key] = value;
        }
    };

    module.exports = settings;
})();
