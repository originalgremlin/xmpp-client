(function(undefined) {
    'use strict';

    var app = require('app'),
        i18n = require('../util/i18n.js'),
        BrowserWindow = require('browser-window'),
        Menu = require('menu'),
        Tray = require('tray');

    module.exports = {
        create: function () {
            var tray = new Tray('./src/images/main/tray.png');
            tray.setToolTip('This is my application.');
            tray.setContextMenu(Menu.buildFromTemplate([
                {
                    label: i18n.t('Open AeroFS Folder'),
                    click: function() { }
                },
                {
                    type: 'separator'
                },
                {
                    label: i18n.t('Invite Coworkers to AeroFS...'),
                    click: function() { }
                },
                {
                    type: 'separator'
                },
                {
                    label: i18n.t('Manage Shared Folders...'),
                    click: function() { }
                },
                {
                    label: i18n.t('Recent Activities'),
                    click: function() { }
                },
                {
                    label: i18n.t('Sync History...'),
                    click: function() { }
                },
                {
                    type: 'separator'
                },
                {
                    label: i18n.t('No active transfers'),
                    click: function() { }
                },
                {
                    label: i18n.t('Pause syncing for an hour'),
                    click: function() { }
                },
                {
                    type: 'separator'
                },
                {
                    label: i18n.t('Preferences...'),
                    click: function() { }
                },
                {
                    label: i18n.t('Help'),
                    submenu: [
                        {
                            label: i18n.t('Report a Problem'),
                            click: function() { }
                        },
                        {
                            label: i18n.t('Support Center'),
                            click: function() { }
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: i18n.t('Network Diagnostics...'),
                            click: function() { }
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: i18n.t('About AeroFS'),
                            click: function() { }
                        }
                    ]
                },
                {
                    type: 'separator'
                },
                {
                    label: i18n.t('Quit AeroFS'),
                    click: function() { app.quit(); }
                }
            ]));
        }
    };
})();
