(function(undefined) {
    'use strict';

    var fs = require('fs'),
        path = require('path'),
        React = require('react'),
        _ = require('lodash');

    var FileTree = React.createClass({
        propTypes: {
            handleFileItemClick: React.PropTypes.func,
            root: React.PropTypes.string.isRequired
        },

        getDefaultProps: function() {
            return { handleFileItemClick: function(){} };
        },

        componentWillMount: function() {
            this.handleFileItemClick = this.props.handleFileItemClick;
        },

        render: function() {
            return (
                <div className="file-tree">
                    <div className="header">
                        <span className="name">{ i18n.t('Name') }</span>
                        <span className="size">{ i18n.t('Size') }</span>
                        <span className="kind">{ i18n.t('Kind') }</span>
                    </div>
                    <div className="placeholder">&nbsp;</div>
                    <Folder ref="folder" path={ this.props.root } root={ this } />
                </div>
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
                        <span className="kind">{ i18n.t('file') }</span>
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
                        <span className="kind">{ i18n.t('folder') }</span>
                    </div>
                    <Folder ref='folder' path={ this.props.path } parent={ this.props.parent } root={ this.props.root } />
                </li>
            );
        }
    });

    module.exports = FileTree;
})();
