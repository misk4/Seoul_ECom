var express = require('express'); 
var mysql = require('mysql');
var router = express.Router();

var connection =mysql.createConnection({
	host : '',
    	user : '',
    	password : '',
    	database : ''
});



router.get('/phar_list',  function(req, res, next) {
    connection.query('select * from pharmacy;',function (error, info){
        if(!error) {
            res.status(201).json(info);
        } else {
            console.log(error.stack);
            res.writeHead(501, { 'Content-Type' : 'text/plain' });
            res.end('Error while acccessing pharmacy database');
        }
    });
});


/*router.get('/phar_listByLoca/:lat/:long',  function(req, res, next) {

connection.query('select * from pharmacy where latitude < ? + 0.005 and latitude > ? - 0.005 and longitude < ? + 0.005 and longitude > ? - 0.005;',[req.params.lat,req.params.lat,req.params.long,req.params.long],function (error, info){

        if(!error) {
               // console.log(j);
            res.status(201).json(info);
        } else {
            console.log(error);
            res.writeHead(501, { 'Content-Type' : 'text/plain' });
            res.end('Error accessing database for pharmacy');
        }
    });
});*/

router.get('/phar_listByLoca/:lat/:long',  function(req, res, next) {

connection.query('SELECT *, ( 6371 * acos( cos( radians(?) ) * cos( radians( latitude ) )* cos( radians( longitude ) - radians(?) )+ sin( radians(?) ) * sin( radians( latitude ) ) ) ) * 1000 AS distance FROM pharmacy HAVING distance < 1000 ORDER BY distance;',[req.params.lat,req.params.long,req.params.lat],function (error, info){

        if(!error) {
               // console.log(j);
		console.log(info);
            res.status(201).json(info);
        } else {
            console.log(error);
            res.writeHead(501, { 'Content-Type' : 'text/plain' });
            res.end('Error accessing database for pharmacy');
        }
    });
});

router.get('/phar_listByLang/:lang/:lat/:long',function(req,res,next){
	connection.query('select *, ( 6371 * acos( cos( radians(?) ) * cos( radians( latitude ) )* cos( radians( longitude ) - radians(?) )+ sin( radians(?) ) * sin( radians( latitude ) ) ) ) * 1000 AS distance from pharmacy where foreignLanguage1 = ? or foreignLanguage2 = ? or  foreignLanguage3 = ? or  foreignLanguage4 = ? order by distance;',[req.params.lat,req.params.long,req.params.lat,req.params.lang, req.params.lang, req.params.lang, req.params.lang], function(error,info){ 
		if(!error){
			res.status(201).json(info);
		}
		else{
			res.writeHead(501, { 'Content-Type' : 'text/plain' });
			res.end('Error accessing database for pharmacy');
		}
	});
});
 

module.exports = router;
