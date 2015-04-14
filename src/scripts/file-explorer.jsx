var remote = require('remote'),
    fs = remote.require('fs'),
    path = remote.require('path'),
    React = require('react'),
    _ = require('lodash');

var Folder = React.createClass({
    getInitialState: function() {
        return { children: [], isVisible: false };
    },

    getRoot: function () {
        var root = this;
        while (!_.isUndefined(root.props.parent)) {
            root = root.props.parent;
        }
        return root;
    },

    componentDidMount: function() {
        if (_.isUndefined(this.props.parent)) {
            this.toggle();
        }
    },

    toggle: function() {
        if (this.state.isVisible) {
            this.clear();
        } else {
            this.update();
        }
    },

    clear: function() {
        this.setState({ children: [], isVisible: false });
    },

    update: function() {
        var self = this,
            folderPath = this.props.path;
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
            self.setState({ children: children, isVisible: true });
        });
    },

    render: function() {
        var self = this;
        var children = this.state.children.map(function (child) {
            return child.kind === 'folder' ?
                <FolderItem {...child} parent={ self } /> :
                <FileItem {...child} parent={ self } />;
        });
        return (
            <ul className="folder">{ children }</ul>
        );
    }
});

var FileItem = React.createClass({
    handleClick: function(evt) {
        evt.stopPropagation();
        this.props.parent.getRoot().props.handleFileItemClick(this);
    },

    render: function() {
        return (
            <li className="file-item" onClick={ this.handleClick }>
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
        evt.stopPropagation();
        this.refs.folder.toggle();
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
                <Folder path={ this.props.path } parent={ this.props.parent } ref='folder' />
            </li>
        );
    }
});

module.exports = Folder;
