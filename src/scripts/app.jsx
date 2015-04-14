var remote = require('remote'),
    fs = remote.require('fs'),
    path = remote.require('path'),
    React = require('react'),
    FileExplorer = require('./build/scripts/file-explorer.js'),
    FileViewer = require('./build/scripts/file-viewer.js'),
    XMPP = require('./build/scripts/xmpp-client.js'),
    config = require('./build/scripts/config.js'),
    _ = require('lodash');

if (config.debug) {
    // not currently working, though may be in the future
    // https://github.com/atom/atom-shell/issues/915
    require('./build/scripts/devtools.js');
}
if (config.watch) {
    require('atom-watcher')();
}

React.initializeTouchEvents(true);

var App = React.createClass({
    getInitialState: function() {
        return { file: null };
    },

    handleFileItemClick: function(fileItem) {
        this.setState({ file: 'file://' + fileItem.props.path });
    },

    render: function() {
        return (
            <div id="app">
                <div id="file-explorer">
                    <FileExplorer id="file-explorer" path={ this.props.root } handleFileItemClick={ this.handleFileItemClick } />
                </div>
                <div id="file-viewer">
                    <FileViewer id="file-viewer" path={ this.state.file } />
                </div>
                <div id="chat" class="chat"></div>
            </div>
        );
    }
});

var home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
    aeroRoot = path.join(home, 'AeroFS');
React.render(
    <App root={ aeroRoot } />,
    document.body
);
