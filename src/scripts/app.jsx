(function(undefined) {
    'use strict';

    var fs = require('fs'),
        path = require('path'),
        React = require('react'),
        ChatClient = require('./build/scripts/components/chat-client.js'),
        FileExplorer = require('./build/scripts/components/file-explorer.js'),
        Settings = require('./build/scripts/components/settings.js'),
        i18n = require('./build/scripts/util/i18n.js'),
        _ = require('lodash');
    require('./build/scripts/util/devtools.js');
    require('./build/scripts/util/atom-watcher.js');
    window.i18n = i18n;

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
                            <li><Link to="files">Files</Link></li>
                            <li><Link to="chat">Chat</Link></li>
                            <li><Link to="settings">Settings</Link></li>
                        </ul>
                    </header>
                    <RouteHandler/>
                </div>
            );
        }
    });

    var routes = (
        <Route name="app" handler={ App } path={ __filename }>
            <Route name="files" handler={ FileExplorer } />
            <Route name="chat" handler={ ChatClient } />
            <Route name="settings" handler={ Settings } />
            <DefaultRoute handler={ FileExplorer }/>
        </Route>
    );

    Router.run(routes, Router.HistoryLocation, function (Handler) {
        React.render(<Handler />, document.body);
    });

    /*
    var home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
        aero = path.join(home, 'AeroFS'),
        root = fs.existsSync(aero) ? aero : home;

    <div id="file-explorer">
        <FileExplorer refs="fileExplorer" root={ root } />
    </div>
    <div id="chat-client">
        <ChatClient ref="chatClient" />
    </div>
    */
})();
