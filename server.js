//Libraries
var express = require('express');
var server  = express();
var mysql   = require('mysql');

if (!process.env.PORT)
    process.env.PORT = 8080;

//Creating connection to database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'tomaz9',
    password: '',
    database: 'northwind'
});

//Connecting to database
connection.connect(function(err){
    if(!err) 
        console.log("Database is connected ...");    
    else 
        console.log("Error connecting database ...");    
});

server.get('/', function (req, res) {
    connection.query('SELECT * FROM customers LIMIT 5', function(err, rows, fields) {
        connection.end();
        if (!err)
            res.send(rows);
           // console.log(rows);
        else
            console.log('Error while performing Query.');
    });
    
});

server.listen(process.env.PORT, function() {
    console.log("Server is running!");
});