var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection =mysql.createConnection({
        host : '',
        user : '',
        password : '',
        database : ''
});



router.get('/notice_list',  function(req, res, next) {
    connection.query('select * from notice;',function (error, info){
        if(!error) {
            res.status(201).json(info);
        } else {
            console.log(error.stack);
            res.writeHead(501, { 'Content-Type' : 'text/plain' });
            res.end('Error while acccessing pharmacy database');
        }
    });
});

module.exports=router;
