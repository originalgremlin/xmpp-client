(function(undefined) {
    'use strict';

    var fs = require('fs'),
        path = require('path'),
        React = require('react'),
        _ = require('lodash');

    var FileTree = React.createClass({
        componentWillMount: function() {
            this.handleFileItemClick = this.props.handleFileItemClick;
        },

        render: function() {
            return (
                <Folder ref="folder" path={ this.props.root } root={ this } />
            );
        },

        componentDidMount: function() {
            this.refs.folder.expand();
        }
    });

    var Folder = React.createClass({
        getInitialState: function() {
            return { children: [], expanded: false };
        },

        toggle: function() {
            var expanded = this.state.expanded;
            this[expanded ? 'contract' : 'expand']();
        },

        expand: function() {
            var parentPath = this.props.path,
                files = fs.readdirSync(parentPath);
            var children = files.map(function (fileName) {
                var filePath = path.join(parentPath, fileName),
                    stats = fs.statSync(filePath);
                return {
                    path: filePath,
                    name: fileName,
                    size: stats.size,
                    isDirectory: stats.isDirectory()
                };
            });
            this.setState({ children: children, expanded: true });
        },

        contract: function() {
            this.setState({ children: [], expanded: false });
        },

        render: function() {
            // XXX: "Warning: Any use of a keyed object should be wrapped in React.addons.createFragment(object) before being passed as a child."
            // XXX: What does this mean? How do I stop it? Why doesn't it appear in other list rendering contexts?
            // XXX: There is no obvious degradation because of the warning.
            var children = this.state.children.map(function (child) {
                return child.isDirectory ?
                    <FolderItem key={child.path} {...child} parent={ this } root={ this.props.root } /> :
                    <FileItem key={child.path} {...child} parent={ this } root={ this.props.root } />;
            }, this);
            return (
                <ul className="folder">{ children }</ul>
            );
        }
    });

    var FileItem = React.createClass({
        handleClick: function(evt) {
            evt.stopPropagation();
            this.props.root.handleFileItemClick(this);
        },

        render: function() {
            return (
                <li className="file-item" onClick={ this.handleClick }>
                    <div>
                        <span className="name">{ this.props.name }</span>
                        <span className="size">{ this.props.size }</span>
                        <span className="kind">{ i18n.t(this.props.isDirectory ? 'folder' : 'file') }</span>
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
                        <span className="kind">{ this.props.kind }</span>
                    </div>
                    <Folder ref='folder' path={ this.props.path } parent={ this.props.parent } root={ this.props.root } />
                </li>
            );
        }
    });

    module.exports = FileTree;
})();
