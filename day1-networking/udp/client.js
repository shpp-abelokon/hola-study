var dgram = require('dgram');
var client = dgram.createSocket('udp4');
var message = '';
process.stdin.resume();
process.stdin.on('data', function(data) {
    message = data.toString('utf8');
    client.send(data, 0, data.length, 8112, "127.0.0.1", function(err, bytes) {
        if (err) console.log('error: ' + err);
    });
});
client.on('message', function(msg, info) {
    if (message == msg) {
        console.log('Server reply:' + msg.toString());
    } else {
        console.log('Error');
    }
    process.exit(0);
});
