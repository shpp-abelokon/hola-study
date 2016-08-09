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
            console.log(JSON.stringify(results.data));
            res.send(JSON.stringify({
                data: results
            }));
        }
    });
    connection.end();
    console.log('Connection close');
}

app.use(bodyParser.json());

/*------------------------------ сhecklogin --------------------------*/
app.post('/checkLogin:', function(req, res) {
    var msqlReq = 'SELECT * FROM users WHERE user_login="' + req.body.user_login + '"';
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'todolist'
    });
    connection.connect();
    console.log('Connection established');

    connection.query(msqlReq, function(error, results) {
        console.log("Просто вывод " + JSON.stringify(results.length));
        var access = {
            login: '',
            pass: '',
            mail: ''
        };
        if (error) {
            console.log(error.message);
        } else {
            if (results.length == 0) {
                access.login = 1;
                msqlReq = 'SELECT * FROM users WHERE user_email="' + req.body.user_email + '"';
                connection.query(msqlReq, function(error, results) {
                    if (error) {
                        console.log(error.message);
                    } else {
                        var regex = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
                        if (results.length == 0 && regex.test(req.body.user_email)) {
                            access.mail = 1;
                            if (req.body.user_pass.length > 3) {
                                access.pass = 1;
                                msqlReq = "INSERT INTO `todolist`.`users` (`ID`, `user_login`, `user_pass`, `user_email`,  `user_status`) VALUES ('','" + req.body.user_login + "','" + req.body.user_pass + "','" + req.body.user_email + "','1')";
                                connection.query(msqlReq, function(error, results) {
                                    if (error) {
                                        console.log(error.message);
                                    } else {
                                        res.send(JSON.stringify(access));
                                    }
                                });
                            } else {
                                access.pass = 0;
                                res.send(JSON.stringify(access));
                            }
                        } else {
                            access.mail = 0;
                            res.send(JSON.stringify(access));
                        }
                    }
                });
            } else {
                access.login = 0;
                res.send(JSON.stringify(access));
            }
        }
    });
    // connection.end();
    console.log('Connection close');
});

/*------------------------------ selectAllUserTasks --------------------------*/
app.post('/selectAllUserTasks:', function(req, res) {
    var msqlReq = 'SELECT * FROM task WHERE task_author="' + req.body.id_author + '"';
    BD(msqlReq, res);
});

/*------------------------------ authorization -------------------------------*/
app.post('/authorization:', function(req, res) {
    // var msqlReq = 'SELECT * FROM users WHERE user_login="' + req.body.login + '" AND user_pass="' + req.body.password + '"';
    var msqlReq = 'SELECT * FROM users WHERE user_login="' + req.body.login + '"';
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'todolist'
    });
    connection.connect();
    console.log('Connection established');

    connection.query(msqlReq, function(error, results) {
        if (error) {
            console.log(error.message);
        } else {
            var access = {
                result: "0"
            };
            if (results.length == 1 && results[0].user_pass == req.body.password) {
                access.result = 1;
                access.id_user = results[0].ID;
            } else {
                access.result = 0;
            }
            res.send(JSON.stringify(access));
        }
    });
});

/*------------------------------ Add/task ------------------------------------*/
app.post('/add/task:', function(req, res) {
    var msqlReq = "INSERT INTO `todolist`.`task` (`ID`, `task_author`, `task_date`, `task_content`, `task_status`) VALUES ('', " + req.body.id_author + ", '', '" + req.body.task + "', " + req.body.status + ")";
    BD(msqlReq, res);
});

/*------------------------------ Del/id_task ---------------------------------*/
app.post('/del/id_task:', function(req, res) {
    var msqlReq = "DELETE FROM `task` WHERE (`ID`=" + req.body.id_task + ")";
    BD(msqlReq, res);
});

/*------------------------------ update/task ---------------------------------*/
app.post('/update/task:', function(req, res) {
    var msqlReq = "UPDATE task SET task_status=" + (JSON.stringify(req.body.status)) + " WHERE ID='" + req.body.id_task + "'";
    BD(msqlReq, res);
});

app.get('/', function(req, res) {
    app.use('/', express.static(__dirname + '/public'));
    res.sendfile(__dirname + '/public/index.html');
});

http.listen(PORT, function() {
    console.log('listening on PORT: ' + PORT);
});
