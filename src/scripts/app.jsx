var React = require('react'),
    XMPP = require('stanza.io'),
    _ = require('lodash');

React.initializeTouchEvents(true);

var CommentList = React.createClass({
    getComments: function(comments) {
        return comments.map(function(comment, index) {
            return (
                <Comment author={comment.author} key={index}>
                    <p dangerouslySetInnerHTML={{__html: comment.text.toString()}} />
                </Comment>
            );
        });
    },

    render: function() {
        return (
            <div className="commentList">
                {this.getComments(this.props.data)}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    handleSubmit: function(evt) {
        evt.preventDefault();
        var authorNode = React.findDOMNode(this.refs.author),
            textNode = React.findDOMNode(this.refs.text),
            author = authorNode.value.trim(),
            text = textNode.value.trim();
        if (text && author) {
            this.props.onCommentSubmit({author: author, text: text});
            authorNode.value = '';
            textNode.value = '';
        }
    },

    render: function() {
        return (
            <div className="commentForm">
                <form className="commentForm" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Your name" ref="author" />
                    <input type="text" placeholder="Say something..." ref="text" />
                    <input type="submit" value="Post" />
                </form>
            </div>
        );
    }
});

var CommentBox = React.createClass({
    getInitialState: function() {
        return { data: [] };
    },

    componentDidMount: function() {
        var data = [
            { author: "Pete Hunt", text: "This is one comment from data." },
            { author: "Jordan Walke", text: "This is <em>another</em> comment from data." }
        ];
        this.setState({ data: data });
    },

    handleCommentSubmit: function(comment) {
        this.setState({ data: this.state.data.concat(comment) });
    },

    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

var Comment = React.createClass({
    render: function() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">{this.props.author}</h2>
                {this.props.children}
            </div>
        );
    }
});

React.render(
    <CommentBox />,
    document.getElementById('content')
);

require('atom-watcher')();
