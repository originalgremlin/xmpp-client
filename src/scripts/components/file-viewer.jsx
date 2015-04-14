(function(undefined) {
    var React = require('react'),
        _ = require('lodash');

    var FileViewer = React.createClass({
        getInitialState: function() {
            return { source: null };
        },

        setSource: function(source) {
            this.setState({ source: source });
        },

        render: function() {
            return (
                <iframe className="file-viewer" src={ this.state.source }></iframe>
            );
        }
    });

    module.exports = FileViewer;
})();
