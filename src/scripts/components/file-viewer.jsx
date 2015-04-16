(function(undefined) {
    'use strict';

    var React = require('react'),
        mime = require('mime'),
        _ = require('lodash');

    var FileViewer = React.createClass({
        getInitialState: function() {
            return { source: null, type: null };
        },

        setSource: function(source) {
            this.setState({ source: source, type: mime.lookup(source) });
        },

        render: function() {
            return (
                <div className="file-viewer">
                    <iframe src={ this.state.source }></iframe>
                </div>
            );
        }
    });

    module.exports = FileViewer;
})();
