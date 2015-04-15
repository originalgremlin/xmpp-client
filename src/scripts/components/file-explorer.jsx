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
                <div>
                    <div className="file-tree">
                        <FileTree refs="fileTree" root={ this.props.root } handleFileItemClick={ this.handleFileItemClick } />
                    </div>
                    <div className="file-viewer">
                        <FileViewer ref="fileViewer" />
                    </div>
                </div>
            );
        }
    });

    module.exports = FileExplorer;
})();
