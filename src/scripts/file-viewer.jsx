var remote = require('remote'),
    fs = remote.require('fs'),
    path = remote.require('path'),
    React = require('react'),
    _ = require('lodash');

var FileViewer = React.createClass({
    render: function() {
        return (
            <iframe className="file-viewer" src={ this.props.path }></iframe>
        );
    }
});

module.exports = FileViewer;
