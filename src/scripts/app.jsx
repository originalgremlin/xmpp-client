(function(undefined) {
    'use strict';

    var fs = require('fs'),
        path = require('path'),
        React = require('react'),
        Router = require('react-router'),
        Route = Router.Route,
        DefaultRoute = Router.DefaultRoute,
        RouteHandler = Router.RouteHandler,
        Nav = require('./build/scripts/components/nav.js'),
        ChatClient = require('./build/scripts/components/chat-client.js'),
        FileExplorer = require('./build/scripts/components/file-explorer.js'),
        FileSearch = require('./build/scripts/components/file-search.js'),
        Settings = require('./build/scripts/components/settings.js'),
        i18n = require('./build/scripts/util/i18n.js'),
        _ = require('lodash');
    require('./build/scripts/util/devtools.js');
    require('./build/scripts/util/atom-watcher.js');
    window.i18n = i18n;

    var home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
        aero = path.join(home, 'AeroFS'),
        root = fs.existsSync(aero) ? aero : home;
    var FileExplorerWrapper = React.createClass({
        render: function() {
            return <FileExplorer root={ root } />
        }
    });

    var App = React.createClass({
        render: function() {
            return (
                <div>
                    <Nav />
                    <RouteHandler />
                </div>
            );
        }
    });

    var routes = (
        <Route name="App" handler={ App } path={ "/" }>
            <Route name="Explore" handler={ FileExplorerWrapper } />
            <Route name="Search" handler={ FileSearch } />
            <Route name="Chat" handler={ ChatClient } />
            <Route name="Settings" handler={ Settings } />
            <DefaultRoute handler={ FileExplorer } />
        </Route>
    );

    Router.run(routes, Router.HashLocation, function (Handler, state) {
        React.render(<Handler />, document.body);
    });
})();
