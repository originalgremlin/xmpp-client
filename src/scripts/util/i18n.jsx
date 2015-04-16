(function(undefined) {
    'use strict';

    var fs = require('fs'),
        util = require('util'),
        Polyglot = require('node-polyglot'),
        _ = require('lodash');

    var warn = function(message) {
        console.warn(util.format('I18N WARNING (%s): %s', locale, message));
    };

    var defaultLocale = 'en',
        locale = navigator.userLanguage || navigator.languages[0] || navigator.language,
        locales = _.uniq([defaultLocale, locale.split('-')[0], locale]),
        polyglot = new Polyglot({ locale: locale, warn: warn });

    locales.forEach(function (locale) {
        try {
            var filename = util.format('./src/i18n/%s.json', locale),
                translations = JSON.parse(fs.readFileSync(filename, {encoding: 'utf8'}));
            polyglot.extend(translations);
        } catch (ex) {
            console.warn(ex);
        }
    });

    module.exports = polyglot;
})();