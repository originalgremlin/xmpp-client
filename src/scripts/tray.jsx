var Menu = require('menu'),
    Tray = require('tray');

module.exports = {
    create: function() {
        appIcon = new Tray('./src/images/aerofs_logo.png');
        appIcon.setToolTip('This is my application.');
        appIcon.setContextMenu(Menu.buildFromTemplate([
            { label: 'Item1', type: 'radio' },
            { label: 'Item2', type: 'radio' },
            { label: 'Item3', type: 'radio', checked: true },
            { label: 'Item4', type: 'radio' }
        ]));
    }
};