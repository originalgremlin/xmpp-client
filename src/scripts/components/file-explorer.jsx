(function(undefined) {
    'use strict';

    var React = require('react'),
        FileTree = require('./file-tree.js'),
        FileViewer = require('./file-viewer.js');

    var FileExplorer = React.createClass({
        handleFileItemClick: function(fileItem) {
            this.refs.fileViewer.setSource('file://' + fileItem.props.path);
        },

        render: function() {
            return (
                <div className="file-explorer">
                    <FileTree refs="fileTree" root={ this.props.query.root } handleFileItemClick={ this.handleFileItemClick } />
                    <FileViewer ref="fileViewer" />
                </div>
            );
        }
    });

    module.exports = FileExplorer;
})();
