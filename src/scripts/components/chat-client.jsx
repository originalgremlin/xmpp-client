(function(undefined) {
    'use strict';

    var React = require('react'),
        XMPP = require('stanza.io');

    var ConnectionForm = React.createClass({
        handleSubmit: function(evt) {
            evt.preventDefault();
            this.props.handleSubmit(this);
        },

        render: function() {
            return (
                <form className="connection-form" onSubmit={ this.handleSubmit }>
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

    var CompositionForm = React.createClass({
        handleSubmit: function(evt) {
            evt.preventDefault();
            var textarea = React.findDOMNode(this.refs.textarea),
                body = textarea.value.trim();
            this.props.handleSubmit({
                body: body
            });
            textarea.value = '';
        },

        render: function() {
            return (
                <form className="composition-form" onSubmit={ this.handleSubmit }>
                    <textarea ref="textarea" />
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
            var current = this.state.messages,
                updated = current.concat([message]);
            this.setState({ messages: updated });
        },

        render: function() {
            var messages = this.state.messages.map(function (message) {
                return <Message key={ Date.now() } {...message} />;
            });
            return (
                <ul className="message-list">{ messages }</ul>
            );
        }
    });

    var Message = React.createClass({
        render: function() {
            return (
                <li className="message">
                    <span className="from">{ this.props.from }</span>
                    <span className="to">{ this.props.to }</span>
                    <span className="body">{ this.props.body }</span>
                </li>
            );
        }
    });

    var ChatClient = React.createClass({
        getInitialState: function() {
            return { username: null, password: null, server: null };
        },

        getClient: function() {
            var client = XMPP.createClient({
                jid: 'barry@localhost',
                password: 'barry',
                transports: ['bosh'],
                boshURL: 'http://localhost:7070/http-bind'
            });

            client.on('*', function () {
                console.log(arguments);
            });

            client.on('session:started', function () {
                client.getRoster();
                client.sendPresence();
            });

            client.on('chat', function (msg) {
                client.sendMessage({
                    to: msg.from,
                    body: 'You sent: ' + msg.body
                });
            });

            client.connect();
        },

        handleConnectionFormSubmit: function(username, password, server) {
            console.log(arguments);
            // TODO: extract form values
            // TODO: connect to server
            // TODO: set state { client: ... }
        },

        handleCompositionFormSubmit: function(message) {
            message.from = this.state.username;
            message.to = 'TODO'
            this.refs.messageList.addMessage(message);
            // TODO: send new message to server
        },

        render: function() {
            return (
                <div className="xmpp-client">
                    <ConnectionForm ref="connectionForm" handleSubmit={ this.handleConnectionFormSubmit } />
                    <MessageList ref="messageList" />
                    <CompositionForm ref="compositionForm" handleSubmit={ this.handleCompositionFormSubmit } />
                </div>
            );
        }
    });

    module.exports = ChatClient;
})();
