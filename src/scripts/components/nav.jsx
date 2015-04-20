(function(undefined) {
    'use strict';

    var React = require('react'),
        Link = require('react-router').Link;

    var Nav = React.createClass({
        render: function() {
            return (
                <header className="nav">
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
