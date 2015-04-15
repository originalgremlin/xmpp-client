(function(undefined) {
    'use strict';

    var fs = require('fs'),
        path = require('path'),
        React = require('react'),
        FileExplorer = require('./build/scripts/components/file-explorer.js'),
        ChatClient = require('./build/scripts/components/chat-client.js'),
        i18n = require('./build/scripts/util/i18n.js'),
        _ = require('lodash');
    require('./build/scripts/util/devtools.js');
    require('./build/scripts/util/atom-watcher.js');
    window.i18n = i18n;

    var home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
        aeroRoot = path.join(home, 'AeroFS');

    var App = React.createClass({
        render: function() {
            return (
                <div id="app">
                    <div id="file-explorer">
                        <FileExplorer refs="fileExplorer" root={ fs.exists(aeroRoot) ? aeroRoot : home } />
                    </div>
                    <div id="chat-client">
                        <ChatClient ref="chatClient" />
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
