(function(undefined) {
    var path = require('path'),
        React = require('react'),
        FileExplorer = require('./build/scripts/components/file-explorer.js'),
        FileViewer = require('./build/scripts/components/file-viewer.js'),
        XMPP = require('./build/scripts/components/xmpp-client.js'),
        _ = require('lodash');
    require('./build/scripts/util/devtools.js');
    require('./build/scripts/util/atom-watcher.js');

    React.initializeTouchEvents(true);

    var App = React.createClass({
        handleFileItemClick: function(fileItem) {
            this.refs.fileViewer.setSource('file://' + fileItem.props.path);
        },

        render: function() {
            return (
                <div id="app">
                    <div id="file-explorer">
                        <FileExplorer id="file-explorer" refs="fileExplorer" path={ this.props.root } handleFileItemClick={ this.handleFileItemClick } />
                    </div>
                    <div id="file-viewer">
                        <FileViewer id="file-viewer" ref="fileViewer" />
                    </div>
                    <div id="chat" className="chat"></div>
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
})();
