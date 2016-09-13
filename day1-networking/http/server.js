var PORT = 8080;
var http = require('http');
var fs = require('fs');
var url = require('url');

var logRequest = function(request, message) {
    var msg = url.parse(request.url, true).query.message;
    var logging_string =
        'http ' + request.method +
        ' ip:' + request.connection.remoteAddress + ';' +
        ' "url:' + request.url + '"' + ' "message: ' + msg + '"' +
        ' [' + new Date().toString() + ']'; // current time and date
    fs.appendFile('log.txt', logging_string + "\n", function(err) {
        if (err) throw err;
        console.log(logging_string);
    });
    message.end(msg);
};

var server = http.createServer().listen(PORT);
console.log("Server has started.");

server.on('request', function(request, response) {
    logRequest(request, response);
});
