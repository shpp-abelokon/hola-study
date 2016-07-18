var PORT = 8112;
var dgram = require('dgram');
var fs = require('fs');

var logRequest = function(msg, info) {
    var logging_string =
        'udp' +
        ' ip:' + info.address +
        ' port:' + info.port +
        ' message: ' + msg +
        ' [' + new Date().toString() + ']';
    fs.appendFile('log', logging_string + '\n', function(err) {
        if (err) return console.log(err);
        console.log(logging_string);
    });
};

var server = dgram.createSocket('udp4');

server.on('message', function(msg, info) {
    server.send(msg, 0, msg.length, info.port, info.address);
    logRequest(msg, info);
});

server.on('listening', function() {
    console.log('Server started listening...');
});
server.on('error', function(err) {
    console.log('server error:\n' + err.stack);
    server.close();
});

server.bind(PORT);
