var PORT = 3000;
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    http = require('http').Server(app);

app.use(bodyParser.json());

app.post('/endpoint', function(req, res) {
    var obj = {};
    console.log('body: ' + JSON.stringify(req.body));
    res.send(req.body);
});

app.get('/', function(req, res) {
    app.use('/', express.static(__dirname + '/public'));
    res.sendfile(__dirname + '/public/index.html');
});

http.listen(PORT, function() {
    console.log('listening on PORT: ' + PORT);
})
