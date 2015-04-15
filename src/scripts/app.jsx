(function(undefined) {
    var path = require('path'),
        React = require('react'),
        FileExplorer = require('./build/scripts/components/file-explorer.js'),
        FileViewer = require('./build/scripts/components/file-viewer.js'),
        XMPPClient = require('./build/scripts/components/xmpp-client.js'),
        i18n = require('./build/scripts/util/i18n.js'),
        _ = require('lodash');
    require('./build/scripts/util/devtools.js');
    require('./build/scripts/util/atom-watcher.js');
    window.i18n = i18n;

    var App = React.createClass({
        getInitialState: function() {
            var home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
                root = path.join(home, 'AeroFS');
            return { root: root };
        },

        handleFileItemClick: function(fileItem) {
            this.refs.fileViewer.setSource('file://' + fileItem.props.path);
        },

        render: function() {
            return (
                <div id="app">
                    <div id="file-explorer">
                        <FileExplorer refs="fileExplorer" path={ this.state.root } handleFileItemClick={ this.handleFileItemClick } />
                    </div>
                    <div id="file-viewer">
                        <FileViewer ref="fileViewer" />
                    </div>
                    <div id="xmpp-client">
                        <XMPPClient ref="xmppClient" />
                    </div>
                    <RouteHandler />
                </div>
            );
        }
    });

    var Router = require('react-router'),
        Route = Router.Route,
        RouteHandler = Router.RouteHandler,
        DefaultRoute = Router.DefaultRoute;

    var routes = (
        <Route name="App" handler={ App } path={ __filename }>
        </Route>
    );

    Router.run(routes, Router.HistoryLocation, function (Handler) {
        React.render(<Handler />, document.body);
    });
})();
