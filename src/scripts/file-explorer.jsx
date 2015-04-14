var remote = require('remote'),
    fs = remote.require('fs'),
    path = remote.require('path'),
    React = require('react'),
    config = require('./build/scripts/config.js'),
    _ = require('lodash');

var FileExplorer = React.createClass({
    render: function() {
        return <Folder path={ this.props.root } />;
    }
});

var Folder = React.createClass({
    getInitialState: function() {
        return { children: [] };
    },

    componentDidMount: function () {
        var self = this;
        fs.readdir(self.props.path, function (err, files) {
            var data;
            if (err) {
                console.log(err);
                children = [];
            } else {
                children = files.map(function (fileName) {
                    var filePath = path.join(self.props.path, fileName);
                    var stats = fs.statSync(filePath);
                    return {
                        path: filePath,
                        name: fileName,
                        size: stats.size,
                        dateModified: stats.mtime,
                        isDirectory: stats.isDirectory(),
                        kind: stats.isDirectory() ? 'folder' : 'file'
                    };
                });
            }
            self.setState({ children: children });
        });
    },

    handleClick: function(evt) {
        console.log('clicky', evt);
    },

    render: function() {
        var children = this.state.children.map(function (child) {
            return child.kind === 'folder' ?
                <FolderItem {...child} onClick={ this.handleClick } /> :
                <FileItem {...child} />;
        });
        return (
            <ul>{ children }</ul>
        );
    }
});

var FileItem = React.createClass({
    render: function() {
        return (
            <li className="file-item">
                <div>
                    <span className="name">{ this.props.name }</span>
                    <span className="size">{ this.props.size }</span>
                    <span className="dateModified">{ this.props.dateModified }</span>
                    <span className="kind">{ this.props.kind }</span>
                </div>
            </li>
        );
    }
});

var FolderItem = React.createClass({
    render: function() {
        return (
            <li className="folder-item">
                <div>
                    <span className="name">{ this.props.name }</span>
                    <span className="size">{ this.props.size }</span>
                    <span className="dateModified">{ this.props.dateModified }</span>
                    <span className="kind">{ this.props.kind }</span>
                </div>
                <Folder path={ this.props.path } />
            </li>
        );
    }
});

var root = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
React.render(
    <FileExplorer root={ root } />,
    document.getElementById('file-explorer')
);
