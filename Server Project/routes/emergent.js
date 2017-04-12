var express = require('express'); 
var mysql = require('mysql');
var router = express.Router();

var connection =mysql.createConnection({
        host : '',
        user : '',
        password : '',
        database : ''
});


router.get('/emer_list/:lat/:long',  function(req, res, next) {
    connection.query('SELECT *, ( 6371 * acos( cos( radians(?) ) * cos( radians( latitude ) )* cos( radians( longitude ) - radians(?) )+ sin( radians(?) ) * sin( radians( latitude ) ) ) ) * 1000 AS distance FROM emergent ORDER BY distance;',[req.params.lat,req.params.long,req.params.lat],function (error, info){
        if(!error) {
		console.log(info);
            res.status(201).json(info);
        } else {
            console.log(error);
            res.writeHead(501, { 'Content-Type' : 'text/plain' });
            res.end('Error while accessing emergent database');
        }
    });

});

router.get('/emer_listByLoca/:lat/:long',  function(req, res, next) {
    connection.query('select * from emergent;',function (error, cursor){
        if(!error) {
                var locaList = new Array();
            for(var i = 0;i < cursor.length;i++){
                if((cursor[i].latitude > req.params.lat - 0.05)&&(cursor[i].latitude < req.params.lat + 0.05)){
                        if((cursor[i].longitude > req.params.long - 0.05)&&(cursor[i].longitude < req.params.long + 0.05)){

                        console.log(cursor[i].latitude);
                        tempLoca = JSON.stringify(cursor[i]);
                        locaList += tempLoca;
                        //console.log("!!!!"+tempLoca);
                         }
                }
           }
                console.log(locaList);
            res.status(201).json(locaList);
        } else {
            console.log(error);
            res.writeHead(501, { 'Content-Type' : 'text/plain' });
            res.end('Error accessing database for pharmacy');
        }
    });
});


module.exports = router;
