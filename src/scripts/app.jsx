(function(undefined) {
    'use strict';

    var fs = require('fs'),
        path = require('path'),
        React = require('react'),
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

    var Router = require('react-router'),
        DefaultRoute = Router.DefaultRoute,
        Link = Router.Link,
        Route = Router.Route,
        RouteHandler = Router.RouteHandler;

    var App = React.createClass({
        render: function() {
            return (
                <div>
                    <header>
                        <ul>
                            <li><Link to="Explore" query={{ root: root }}>Explore</Link></li>
                            <li><Link to="Search">Search</Link></li>
                            <li><Link to="Chat">Chat</Link></li>
                            <li><Link to="Settings">Settings</Link></li>
                        </ul>
                    </header>
                    <RouteHandler {...this.props} />
                </div>
            );
        }
    });

    var routes = (
        <Route name="App" handler={ App } path={ "/" }>
            <Route name="Explore" handler={ FileExplorer } />
            <Route name="Search" handler={ FileSearch } />
            <Route name="Chat" handler={ ChatClient } />
            <Route name="Settings" handler={ Settings } />
            <DefaultRoute handler={ FileExplorer }/>
        </Route>
    );

    Router.run(routes, Router.HashLocation, function (Handler, state) {
        console.log(state);
        React.render(<Handler params={ state.params } query={ state.query } />, document.body);
    });
})();
