//Libraries
var express = require('express');
var server  = express();
var mysql   =  require('mysql');
var formidable = require("formidable");
server.set('view engine', 'ejs');
var util = require('util');
server.use(express.static('public'));

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
    res.render('index', {});
});

server.get('/products', function(req, res) {
    connection.query('SELECT * FROM products', function(err, rows, fields) {
        if (!err) {
            res.render('products', {products: rows});
        }
        else
            console.log('Error while performing Query.');
    });
});

server.listen(process.env.PORT, function() {
    console.log("Server is running!");
});