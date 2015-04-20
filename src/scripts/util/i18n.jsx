(function(undefined) {
    'use strict';

    var fs = require('fs'),
        util = require('util'),
        Polyglot = require('node-polyglot'),
        _ = require('lodash');

    var warn = function(message) {
        console.warn(util.format('I18N WARNING (%s): %s', locale, message));
    };

    var getLocale = function(defaultLocale) {
        if (typeof navigator !== 'undefined') {
            return navigator.language;
        } else if (typeof process !== 'undefined') {
            return process.env.LANG.replace('_', '-').split('.')[0];
        } else {
            return defaultLocale;
        }
    };

    var getLocales = function (locale, defaultLocale) {
        return _.uniq([defaultLocale, locale.split('-')[0], locale]);
    };

    var defaultLocale = 'en',
        locale = getLocale(defaultLocale),
        locales = getLocales(locale, defaultLocale),
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