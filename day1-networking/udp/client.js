var dgram = require('dgram');
var client = dgram.createSocket('udp4');

process.stdin.resume();
process.stdin.on('data', function(data) {
    console.log('Server Reply:' + data.toString('utf8'));

    client.send(data, 0, data.length, 8112, "shpp", function(err, bytes) {
        if (err)
            console.log('error: ' + err);
        else {
            console.log('successful');
        }
    });
});
