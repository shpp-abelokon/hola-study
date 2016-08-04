var PORT = 3000;
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    http = require('http').Server(app);

function BD(myQuery) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'todolist'
    });
    connection.connect();
    console.log('Connection established');

    connection.query(myQuery, function(error) {
        if (error) {
            console.log(error.message);
        } else {
            console.log('success');
        }
    });
    connection.end();
    console.log('Connection close');
}


app.use(bodyParser.json());

app.post('/', function(req, res) {
    console.log(req.body.text);
    var obj = {
        task_author: req.body.id_author,
        task_content: req.body.text,
        task_status: req.body.status
    };

    console.log(obj);

    var currencyInsert = "INSERT INTO `todolist`.`task` (`ID`, `task_author`, `task_date`, `task_content`, `task_status`) VALUES ('', " + req.body.id_author + ", '', '" + req.body.text + "', " + req.body.status + ")";
    var objBD = BD(currencyInsert);
    // // objBD.query('какой то запрос?', obj, function(error) {
    // objBD.query(currencyInsert, function(error) {
    //      if (error) {
    //          console.log(error.message);
    //      } else {
    //          console.log('success');
    //      }
    //    });

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
