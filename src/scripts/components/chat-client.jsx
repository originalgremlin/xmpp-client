(function(undefined) {
    'use strict';

    var settings = require('../util/settings.js'),
        React = require('react'),
        XMPP = require('stanza.io'),
        _ = require('lodash');

    var MessageForm = React.createClass({
        handleSubmit: function(evt) {
            evt.preventDefault();
            var form = evt.target;
            this.props.handleSubmit({
                body: form.body.value
            });
            form.body.value = '';
        },

        render: function() {
            return (
                <form className="message-form" onSubmit={ this.handleSubmit }>
                    <input name="body" />
                </form>
            );
        }
    });

    var MessageList = React.createClass({
        getInitialState: function() {
            return { messages: [] };
        },

        addMessage: function(message) {
            message.id = Date.now();
            var current = this.state.messages,
                updated = current.concat([message]);
            this.setState({ messages: updated });
        },

        render: function() {
            var messages = this.state.messages.map(function (message) {
                return <Message key={ message.id } {...message} />;
            });
            return (
                <ul className="message-list">{ messages }</ul>
            );
        }
    });

    var Message = React.createClass({
        render: function() {
            var classNames = ['message', (this.props.outgoing ? 'outgoing' : 'incoming')];
            return (
                <li className={ classNames.join(' ') }>
                    <span className="from">{ this.props.from }</span>
                    <span className="to">{ this.props.to }</span>
                    <span className="body">{ this.props.body }</span>
                </li>
            );
        }
    });

    var ChatClient = React.createClass({
        getInitialState: function() {
            return { client: null };
        },

        componentWillMount: function() {
            var credentials = {
                jid: settings.get('chat/jid'),
                password: settings.get('chat/password'),
                server: settings.get('chat/server')
            };
            var client = this.getClient(credentials);
            if (!_.isNull(this.state.client)) {
                this.state.client.disconnect();
            }
            this.setState({ client: client });
            client.connect();
        },

        getClient: function(credentials) {
            var client = XMPP.createClient(credentials.server.startsWith('ws') ?
                { jid: credentials.jid, password: credentials.password, transports: ['websocket'], websocketURL: credentials.server, useStreamManagement: true } :
                { jid: credentials.jid, password: credentials.password, transports: ['bosh'], boshURL: credentials.server, useStreamManagement: true }
            );
            client.enableKeepAlive();
            client.on('*', this.handleWildcard);
//            client.on('auth:success', this.handleAuthSuccess);
//            client.on('auth:failed', this.handleAuthFailed);
//            client.on('chat', this.handleChat);
//            client.on('chat:state', this.handleChatState);
//            client.on('connected', this.handleConnected);
//            client.on('disconnected', this.handleDisconnected);
//            client.on('groupchat', this.handleGroupChat);
//            client.on('session:started', this.handleSessionStarted);
            return client;
        },

        handleWildcard: function () {
            console.log(arguments);
        },

        handleSessionStarted: function() {
            this.state.client.getRoster();
            this.state.client.sendPresence();
        },

        handleMessageFormSubmit: function(message) {
            // optimistically add message to conversation
            var client = this.state.client;
            this.refs.messageList.addMessage({
                from: client.config.jid.bare,
                to: 'TODO',
                body: message.body,
                outgoing: true
            });
            // send message to server
            client.sendMessage({
                from: client.config.jid,
                to: 'TODO',
                body: message.body
            });
        },

        render: function() {
            return (
                <div className="chat-client">
                    <MessageList ref="messageList" />
                    <MessageForm ref="messageForm" handleSubmit={ this.handleMessageFormSubmit } />
                </div>
            );
        },

        componentWillUnmount: function() {
            if (!_.isNull(this.state.client)) {
                this.state.client.disconnect();
            }
        }
    });

    module.exports = ChatClient;
})();
