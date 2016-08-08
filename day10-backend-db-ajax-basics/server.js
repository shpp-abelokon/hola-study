var PORT = 3000;
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    http = require('http').Server(app);

function BD(myQuery, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'todolist'
    });
    connection.connect();
    console.log('Connection established');

    connection.query(myQuery, function(error, results) {
        if (error) {
            console.log(error.message);
        } else {
            console.log('success');
            console.log({
                data: results
            });
            res.send(JSON.stringify({
                data: results
            }));
        }
    });
    connection.end();
    console.log('Connection close');
}


app.use(bodyParser.json());

/*------------------------------ selectAllUserTasks -----------------------------------*/
app.post('/selectAllUserTasks:', function(req, res) {
    var msqlReq = 'SELECT * FROM task WHERE task_author="' + req.body.id_author + '"';
    BD(msqlReq, res);
});

/*------------------------------ authorization -----------------------------------*/
app.post('/authorization:', function(req, res) {
    var msqlReq = 'SELECT * FROM users WHERE user_login="' + req.body.login + '" AND user_pass="' + req.body.password + '"';
    BD(msqlReq, res);
});

/*------------------------------ Add/task -----------------------------------*/
app.post('/add/task:', function(req, res) {
    var msqlReq = "INSERT INTO `todolist`.`task` (`ID`, `task_author`, `task_date`, `task_content`, `task_status`) VALUES ('', " + req.body.id_author + ", '', '" + req.body.task + "', " + req.body.status + ")";
    BD(msqlReq, res);
});

/*------------------------------ Del/id_task --------------------------------*/
app.post('/del/id_task:', function(req, res) {
    var msqlReq = "DELETE FROM `task` WHERE (`ID`=" + req.body.id_task + ")";
    BD(msqlReq, res);
});

/*------------------------------ update/task -----------------------------------*/
app.post('/update/task:', function(req, res) {
    var msqlReq = "UPDATE task SET task_status=" + (JSON.stringify(req.body.status)) + " WHERE ID='" + req.body.id_task + "'";
    BD(msqlReq, res);
});

/* -------------------------- /  --------------------------------------------*/
app.post('/', function(req, res) {

    var obj = {
        task_author: req.body.id_author,
        task_content: req.body.text,
        task_status: req.body.status
    };

    var msqlReq = "INSERT INTO `todolist`.`task` (`ID`, `task_author`, `task_date`, `task_content`, `task_status`) VALUES ('', " + req.body.id_author + ", '', '" + req.body.text + "', " + req.body.status + ")";

    var objBD = BD(msqlReq);

    res.send(req.body);
});

app.get('/', function(req, res) {
    app.use('/', express.static(__dirname + '/public'));
    res.sendfile(__dirname + '/public/index.html');
});

http.listen(PORT, function() {
    console.log('listening on PORT: ' + PORT);
});
