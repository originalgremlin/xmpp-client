(function(undefined) {
    'use strict';

    var React = require('react'),
        XMPP = require('stanza.io');

    var CredentialsForm = React.createClass({
        handleSubmit: function(evt) {
            evt.preventDefault();
            var form = evt.target;
            this.props.handleSubmit({
                jid: form.jid.value,
                password: form.password.value,
                server: form.server.value
            });
        },

        render: function() {
            return (
                <form className="credentials-form" onSubmit={ this.handleSubmit }>
                    <fieldset>
                        <label htmlFor="jid">{ i18n.t('username') }</label>
                        <input name="jid" type="text" placeholder={ i18n.t('username@server') } />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password">{ i18n.t('password') }</label>
                        <input name="password" type="password" />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="server">{ i18n.t('server url') }</label>
                        <input name="server" type="text" placeholder={ i18n.t('http://example.com:5222/http-bind/') } />
                    </fieldset>
                    <fieldset>
                        <button type="submit">{ i18n.t('Connect') }</button>
                    </fieldset>
                </form>
            );
        }
    });

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
                    <textarea name="body" rows="4" />
                    <button type="submit">{ i18n.t('Submit') }</button>
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

        getClient: function(credentials) {
            var client = XMPP.createClient(credentials.server.startsWith('ws') ?
                { jid: credentials.jid, password: credentials.password, transports: ['websocket'], websocketURL: credentials.server, useStreamManagement: true } :
                { jid: credentials.jid, password: credentials.password, transports: ['bosh'], boshURL: credentials.server, useStreamManagement: true }
            );
            client.enableKeepAlive();
            client.on('*', this.handleWildcard);
            client.on('session:started', handleSessionStarted);
            return client;
        },

        handleCredentialsFormSubmit: function(credentials) {
            var client = this.getClient(credentials);
            if (!_.isNull(this.state.client)) {
                this.state.client.disconnect();
            }
            this.setState({ client: client });
            client.connect();
        },

        handleMessageFormSubmit: function(message) {
            // optimistically add message to conversation
            this.refs.messageList.addMessage({
                from: this.state.client.config.jid,
                to: 'TODO',
                body: message.body,
                outgoing: true
            });
            // send message to server
            client.sendMessage({
                to: 'TODO',
                body: message.body
            });
        },

        handleWildcard: function () {
            console.log(arguments);
        },

        handleSessionStarted: function() {
            this.state.client.getRoster();
            this.state.client.sendPresence();
        },

        render: function() {
            return (
                <div className="chat-client">
                    <CredentialsForm ref="credentialsForm" handleSubmit={ this.handleCredentialsFormSubmit } />
                    <MessageList ref="messageList" />
                    <MessageForm ref="messageForm" handleSubmit={ this.handleMessageFormSubmit } />
                </div>
            );
        }
    });

    module.exports = ChatClient;
})();
