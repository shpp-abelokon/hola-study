var PORT = 8111;
var net = require('net');
var fs = require('fs');

var logRequest = function(socket, message) {
    var logging_string =
        'tcp' +
        ' ip:' + socket.remoteAddress + ';' +
        ' "message: ' + message + '"' +
        ' [' + new Date().toString() + ']';
    fs.appendFile('log', logging_string + "\n", function(err) {
        if (err) return console.log(err);
        console.log(logging_string);
    });
};

var server = net.createServer(function(socket) {
    socket.on('data', function(data) {
        logRequest(socket, data);
        socket.write('Server Reply:' + data);
    });

    socket.on('end', function() {
        logRequest(socket, 'session closed');
    });
});

server.listen(PORT, function() {
    console.log('Server started listening...');
});
