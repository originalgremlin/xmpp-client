(function(undefined) {
    'use strict';

    var Elasticsearch = require('elasticsearch'),
        FileViewer = require('./file-viewer.js'),
        React = require('react');

    var SearchForm = React.createClass({
        handleSubmit: function(evt) {
            evt.preventDefault();
            var form = evt.target;
            this.props.handleSubmit(form.query.value);
        },

        render: function() {
            return (
                <form className="search-form" onSubmit={ this.handleSubmit }>
                    <input name="query" type="search" />
                    <button type="submit">{ i18n.t('Search') }</button>
                </form>
            );
        }
    });

    var SearchResult = React.createClass({
        handleClick: function(evt) {
            evt.stopPropagation();
            this.props.handleSearchResultClick(this.props.path);
        },

        render: function() {
            return (
                <li className="search-result" onClick={ this.handleClick }>
                    <span className="path">{ this.props.path.split('/').pop() }</span>
                    <span className="size">{ this.props.size }</span>
                </li>
            );
        }
    });

    var SearchResults = React.createClass({
        getDefaultProps: function() {
            return { query: '' };
        },

        componentWillMount: function() {
            this.setState({ client: new Elasticsearch.Client(), results: [] });
        },

        componentWillReceiveProps: function(props) {
            var self = this;
            self.state.client.search({
                index: 'aerofs',
                type: 'file',
                body: {
                    'query': {
                        'multi_match' : {
                            'query': props.query,
                            'fields': ['file', 'path']
                        }
                    }
                }
            }).then(function (response) {
                self.setState({ results: response.hits.hits });
            }, function (err) {
                console.error(err.message);
                self.setState({ results: [] });
            });
        },

        render: function() {
            var results = this.state.results.map(function (result) {
                var source = result._source;
                return <SearchResult key={source.path} {...source} handleSearchResultClick={ this.props.handleSearchResultClick } />;
            }, this);
            return (
                <div className="search-results">
                    <div className="header">
                        <span className="name">{ i18n.t('Name') }</span>
                        <span className="size">{ i18n.t('Size') }</span>
                    </div>
                    <div className="placeholder">&nbsp;</div>
                    <ul>{ results }</ul>
                </div>
            );
        },

        componentWillUnmount: function() {
            this.state.client.close();
        }
    });

    var SearchExplorer = React.createClass({
        handleSearchResultClick: function(path) {
            this.refs.fileViewer.setSource('file://' + path);
        },

        render: function() {
            return (
                <div className="search-explorer">
                    <SearchResults ref='searchResults' query={ this.props.query } handleSearchResultClick={ this.handleSearchResultClick } />
                    <FileViewer ref='fileViewer' />
                </div>
            );
        }
    });

    var FileSearch = React.createClass({
        getInitialState: function() {
            return { query: '' };
        },

        handleSearch: function(query) {
            this.setState({ query: query });
        },

        render: function() {
            return (
                <div className="file-search">
                    <SearchForm ref='searchForm' handleSubmit={ this.handleSearch } />
                    <SearchExplorer ref='searchExplorer' query={ this.state.query } />
                </div>
            );
        }
    });

    module.exports = FileSearch;
})();
