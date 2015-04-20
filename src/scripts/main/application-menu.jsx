(function(undefined) {
    'use strict';

    var app = require('app'),
        i18n = require('../util/i18n.js'),
        BrowserWindow = require('browser-window'),
        Menu = require('menu');

    module.exports = {
        create: function() {
            Menu.setApplicationMenu(Menu.buildFromTemplate([
                {
                    label: i18n.t('Atom Shell'),
                    submenu: [
                        {
                            label: i18n.t('About Atom Shell'),
                            selector: 'orderFrontStandardAboutPanel:'
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: i18n.t('Services'),
                            submenu: []
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: i18n.t('Hide Atom Shell'),
                            accelerator: 'Command+H',
                            selector: 'hide:'
                        },
                        {
                            label: i18n.t('Hide Others'),
                            accelerator: 'Command+Shift+H',
                            selector: 'hideOtherApplications:'
                        },
                        {
                            label: i18n.t('Show All'),
                            selector: 'unhideAllApplications:'
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: i18n.t('Quit'),
                            accelerator: 'Command+Q',
                            click: function() { app.quit(); }
                        }
                    ]
                },
                {
                    label: i18n.t('Edit'),
                    submenu: [
                        {
                            label: i18n.t('Undo'),
                            accelerator: 'Command+Z',
                            selector: 'undo:'
                        },
                        {
                            label: i18n.t('Redo'),
                            accelerator: 'Shift+Command+Z',
                            selector: 'redo:'
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: i18n.t('Cut'),
                            accelerator: 'Command+X',
                            selector: 'cut:'
                        },
                        {
                            label: i18n.t('Copy'),
                            accelerator: 'Command+C',
                            selector: 'copy:'
                        },
                        {
                            label: i18n.t('Paste'),
                            accelerator: 'Command+V',
                            selector: 'paste:'
                        },
                        {
                            label: i18n.t('Select All'),
                            accelerator: 'Command+A',
                            selector: 'selectAll:'
                        }
                    ]
                },
                {
                    label: i18n.t('View'),
                    submenu: [
                        {
                            label: i18n.t('Reload'),
                            accelerator: 'Command+R',
                            click: function() { BrowserWindow.getFocusedWindow().reloadIgnoringCache(); }
                        },
                        {
                            label: i18n.t('Toggle DevTools'),
                            accelerator: 'Alt+Command+I',
                            click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); }
                        }
                    ]
                },
                {
                    label: i18n.t('Window'),
                    submenu: [
                        {
                            label: i18n.t('Minimize'),
                            accelerator: 'Command+M',
                            selector: 'performMiniaturize:'
                        },
                        {
                            label: i18n.t('Close'),
                            accelerator: 'Command+W',
                            selector: 'performClose:'
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: i18n.t('Bring All to Front'),
                            selector: 'arrangeInFront:'
                        }
                    ]
                },
                {
                    label: i18n.t('Help'),
                    submenu: []
                }
            ]));
        }
    };
})();
