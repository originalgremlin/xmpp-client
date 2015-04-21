(function(undefined) {
    'use strict';

    var settings = require('../util/settings.js'),
        util = require('util'),
        React = require('react'),
        _ = require('lodash');

    var Settings = React.createClass({
        validations: {
            'chat/jid': function(value) {
                return /^[a-zA-Z0-9\.-_]+@[a-zA-Z0-9\.-_]+$/.test(value);
            },
            'chat/password': function(value) {
                return !_.isEmpty(value);
            },
            'chat/server': function(value) {
                return /^(ws|http):\/\/[a-zA-Z0-9\.-_]+\.[a-z]{2,3}:\d+\/.*$/.test(value);
            }
        },

        getInitialState: function() {
            return {
                'chat/jid': settings.get('chat/jid'),
                'chat/password': settings.get('chat/password'),
                'chat/server': settings.get('chat/server')
            };
        },

        onBlur: function(evt) {
            var target = evt.target,
                key = target.name,
                value = target.value.trim();
            if (this.validations[key](value)) {
                settings.set(key, value);
                this.setState({ key: value });
            }
        },

        render: function() {
            return (
                <form className="settings" onBlur={ this.onBlur }>
                    <h2>Chat Server</h2>
                    <fieldset>
                        <label htmlFor="jid">{ i18n.t('username') }</label>
                        <input name="chat/jid" type="text" placeholder={ i18n.t('username@server') } defaultValue={ this.state['chat/jid'] } />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password">{ i18n.t('password') }</label>
                        <input name="chat/password" type="password" defaultValue={ this.state['chat/password'] } />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="server">{ i18n.t('server url') }</label>
                        <input name="chat/server" type="text" placeholder={ i18n.t('http://example.com:5222/http-bind/') } defaultValue={ this.state['chat/server'] } />
                    </fieldset>
                </form>
            );
        }
    });

    module.exports = Settings;
})();
