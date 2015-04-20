(function(undefined) {
    'use strict';

    //----------------------------------------------
    // node utils
    var fs = require('fs'),
        path = require('path');

    // routing
    var Router = require('react-router'),
        Route = Router.Route,
        DefaultRoute = Router.DefaultRoute,
        RouteHandler = Router.RouteHandler;

    // components
    var React = require('react'),
        ChatClient = require('./build/scripts/components/chat-client.js'),
        FileExplorer = require('./build/scripts/components/file-explorer.js'),
        FileSearch = require('./build/scripts/components/file-search.js'),
        Nav = require('./build/scripts/components/nav.js'),
        PropsWrapper = require('./build/scripts/util/props-wrapper.js'),
        Settings = require('./build/scripts/components/settings.js');

    // utilities
    var i18n = window.i18n = require('./build/scripts/util/i18n.js'),
        _ = require('lodash');

    // development
    require('./build/scripts/util/devtools.js');
    require('./build/scripts/util/atom-watcher.js');

    //----------------------------------------------
    // app
    var App = React.createClass({
        render: function() {
            return (
                <div id="app">
                    <Nav />
                    <RouteHandler />
                </div>
            );
        }
    });

    var home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
        aero = path.join(home, 'AeroFS'),
        root = fs.existsSync(aero) ? aero : home;
    var routes = (
        <Route name="App" handler={ App } path={ '/' }>
            <Route name="Explore" handler={ PropsWrapper(FileExplorer, { root: root }) } />
            <Route name="Search" handler={ FileSearch } />
            <Route name="Chat" handler={ ChatClient } />
            <Route name="Settings" handler={ Settings } />
            <DefaultRoute handler={ PropsWrapper(FileExplorer, { root: root }) } />
        </Route>
    );
    Router.run(routes, Router.HashLocation, function (Handler) {
        React.render(<Handler />, document.body);
    });
})();
