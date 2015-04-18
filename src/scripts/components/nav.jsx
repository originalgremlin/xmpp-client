(function(undefined) {
    'use strict';

    var fs = require('fs'),
        path = require('path'),
        React = require('react'),
        Router = require('react-router'),
        DefaultRoute = Router.DefaultRoute,
        Link = Router.Link,
        Route = Router.Route,
        RouteHandler = Router.RouteHandler;

    var home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
        aero = path.join(home, 'AeroFS'),
        root = fs.existsSync(aero) ? aero : home;

    var Nav = React.createClass({
        render: function() {
            return (
                <header>
                    <ul>
                        <li><Link to="Explore">Explore</Link></li>
                        <li><Link to="Search">Search</Link></li>
                        <li><Link to="Chat">Chat</Link></li>
                        <li><Link to="Settings">Settings</Link></li>
                    </ul>
                </header>
            );
        }
    });

    module.exports = Nav;
})();
