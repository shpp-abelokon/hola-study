var PORT = 8888;
var http = require("http"); // The connection from the http module
var fs = require("fs"); // The connection from the fs module
var url = require("url"); // The connection from the url module

var logRequest = function(request, message) {
        var logging_string =
            'http ' + request.method +
            ' ip:' + request.connection.remoteAddress + ';' +
            ' "url:' + request.url + '"' + ' "message: ' + message + '"' +
            ' [' + new Date().toString() + ']'; // current time and date
        fs.appendFile('log.txt', logging_string + "\n", function(err) {
            if (err) throw err;
            console.log(logging_string);
        });
    }

function onRequest(request, response) {
    data = url.parse(request.url, true).query.message;
    var message = '';
    if (data) {
        message = '<p>Server response: ' + data; 
        logRequest(request, data);
    }

    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.write('<html><body>' + '<h1>HTTP client/server on the Node.js</h1>' + '<p>' + message + '</p>' + '<p><form method="GET">' + '<textarea rows="10" cols="45" type="text" id="message" name="message" placeholder="Enter your echo message here"></textarea><br>' + '<button type="submit">Send</button>' + '</form></p>' + '</body></html>');
    response.end();
}

http.createServer(onRequest).listen(PORT);
console.log("Server has started.");
