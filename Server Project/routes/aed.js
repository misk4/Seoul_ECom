var express = require('express'); 
var mysql = require('mysql');
var router = express.Router();

var connection =mysql.createConnection({
        host : '',
        user : '',
        password : '',
        database : ''
});


router.get('/aed_list',  function(req, res, next) {
    connection.query('select * from aeds;',function (error, info){
        if(!error) {
            res.status(201).json(info);
        } else {
            console.log(error);
            res.writeHead(501, { 'Content-Type' : 'text/plain' });
            res.end('Error while accessing aed database');
        }
    });
});


/*router.get('/aed_listByLoca/:lat/:long',  function(req, res, next) {

    connection.query('select * from aed where latitude < ? + 0.005 and latitude > ? - 0.005 and longitude < ? + 0.005 and longitude > ? - 0.005;',[req.params.lat,req.params.lat,req.params.long,req.params.long],function (error, info){
        if(!error) {
//               console.log(info);
            res.status(201).json(info);
        } else {
            console.log(error);
            res.writeHead(501, { 'Content-Type' : 'text/plain' });
            res.end('Error accessing database for pharmacy');
        }
    });
});

*/

router.get('/aed_listByLoca/:lat/:long',  function(req, res, next) {

connection.query('SELECT *, ( 6371 * acos( cos( radians(?) ) * cos( radians( latitude ) )* cos( radians( longitude ) - radians(?) )+ sin( radians(?) ) * sin( radians( latitude ) ) ) ) * 1000 AS distance FROM aeds HAVING distance < 1000 ORDER BY distance;',[req.params.lat,req.params.long,req.params.lat],function (error, info){

        if(!error) {
               // console.log(j);
            res.status(201).json(info);
        } else {
            console.log(error);
            res.writeHead(501, { 'Content-Type' : 'text/plain' });
            res.end('Error accessing database for pharmacy');
        }
    });
});


module.exports = router;
