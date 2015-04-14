var remote = require('remote'),
    fs = remote.require('fs'),
    path = remote.require('path'),
    React = require('react'),
    config = require('./build/scripts/config.js'),
    _ = require('lodash');

var Folder = React.createClass({
    getInitialState: function() {
        return { children: [] };
    },

    componentDidMount: function() {
        if (this.props.preload) {
            this.update(this.props.path);
        }
    },

    handleFolderItemClick: function(folderItem) {
        this.update(folderItem.props.path);
    },

    update: function(folderPath) {
        var self = this;
        fs.readdir(folderPath, function (err, files) {
            var data;
            if (err) {
                console.log(err);
                children = [];
            } else {
                children = files.map(function (fileName) {
                    var filePath = path.join(folderPath, fileName),
                        stats = fs.statSync(filePath);
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

    render: function() {
        var self = this;
        var children = this.state.children.map(function (child) {
            return child.kind === 'folder' ?
                <FolderItem {...child} handleFolderItemClick={ self.handleFolderItemClick } /> :
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
    handleClick: function(evt) {
        this.refs.folder.props.handleFolderItemClick(this);
    },

    render: function() {
        return (
            <li className="folder-item" onClick={ this.handleClick }>
                <div>
                    <span className="name">{ this.props.name }</span>
                    <span className="size">{ this.props.size }</span>
                    <span className="dateModified">{ this.props.dateModified }</span>
                    <span className="kind">{ this.props.kind }</span>
                </div>
                <Folder path={ this.props.path } ref='folder' />
            </li>
        );
    }
});

var root = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
React.render(
    <Folder path={ root } preload={ true } />,
    document.getElementById('file-explorer')
);
