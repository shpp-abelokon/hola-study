var PORT = 3000;
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    http = require('http').Server(app);

function BD(){
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'todolist'
  });
  connection.connect();

  connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    console.log('Connection established');
  });

  connection.end();
}


app.use(bodyParser.json());

app.post('/', function(req, res) {
    var objBD = BD();
    var obj = {
      text: req.body.text,
      status: req.body.status
    };
    console.log(obj);
    objBD.query('какой то запрос?', obj, function(error) {
         if (error) {
             console.log(error.message);
         } else {
             console.log('success');
         }
       });

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
