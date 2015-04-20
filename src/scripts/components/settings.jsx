(function(undefined) {
    'use strict';

    var settings = require('../util/settings.js'),
        React = require('react'),
        _ = require('lodash');

    var Settings = React.createClass({
        onBlur: function(evt) {
            var target = evt.target,
                key = target.name,
                value = target.value.trim();
            if (!_.isEmpty(value)) {
                settings.set(key, value);
            }
        },

        render: function() {
            return (
                <form className="settings" onBlur={ this.onBlur }>
                    <h2>Chat Server</h2>
                    <fieldset>
                        <label htmlFor="jid">{ i18n.t('username') }</label>
                        <input name="chat/jid" type="text" placeholder={ i18n.t('username@server') } defaultValue={ settings.get('chat/jid') } />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password">{ i18n.t('password') }</label>
                        <input name="chat/password" type="password" defaultValue={ settings.get('chat/password') } />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="server">{ i18n.t('server url') }</label>
                        <input name="chat/server" type="text" placeholder={ i18n.t('http://example.com:5222/http-bind/') } defaultValue={ settings.get('chat/server') } />
                    </fieldset>
                </form>
            );
        }
    });

    module.exports = Settings;
})();
