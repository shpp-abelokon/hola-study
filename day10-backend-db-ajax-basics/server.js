var PORT = 3000;
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    http = require('http').Server(app);

function BD(myQuery,res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'todolist'
    });
    connection.connect();
    console.log('Connection established');

  connection.query(myQuery, function(error,results) {
        if (error) {
            console.log(error.message);
        } else {
            console.log('success');
            res.send(JSON.stringify({'data': results.insertId}));
        }
    });
    connection.end();
    console.log('Connection close');
}


app.use(bodyParser.json());

/*------------------------------ Add/task -----------------------------------*/
app.post('/add/task:', function(req, res) {
    console.log("Сервер запрос принял"+req.body);

    var msqlReq = "INSERT INTO `todolist`.`task` (`ID`, `task_author`, `task_date`, `task_content`, `task_status`) VALUES ('', " + req.body.id_author + ", '', '" + req.body.task + "', " + req.body.status + ")";

    /*var objBD =*/ BD(msqlReq,res);
    // console.log("ЭТО ответ от msql: "+objBD);
    // console.log('body: ' + JSON.stringify(req.body));
    // res.send(req.body);
      // res.send(JSON.stringify({'data': 44}));
});





/*------------------------------ Del/id_task --------------------------------*/
app.post('/del/id_task:', function(req, res) {
    console.log(req.body);

    var msqlReq = "DELETE FROM `task` WHERE (`ID`="+req.body.id_task+")";

    var objBD = BD(msqlReq);
    console.log("ЭТО ответ от msql: "+objBD);
    console.log('body: ' + JSON.stringify(req.body));
    res.send(req.body);
});

/* -------------------------- /  --------------------------------------------*/
app.post('/', function(req, res) {
    console.log(req.body.text);
    var obj = {
        task_author: req.body.id_author,
        task_content: req.body.text,
        task_status: req.body.status
    };

    console.log(obj);

    var msqlReq = "INSERT INTO `todolist`.`task` (`ID`, `task_author`, `task_date`, `task_content`, `task_status`) VALUES ('', " + req.body.id_author + ", '', '" + req.body.text + "', " + req.body.status + ")";

    var objBD = BD(msqlReq);
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
});
