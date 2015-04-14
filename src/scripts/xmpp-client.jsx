var XMPP = require('stanza.io');

var client = XMPP.createClient({
    jid: 'barry@localhost',
    password: 'barry',
    transports: ['bosh'],
    boshURL: 'http://localhost:7070/http-bind'
});
window.client = client;

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

module.exports = XMPP;