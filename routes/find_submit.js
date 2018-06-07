var sql_connection = require('../custom_modules/sql_connect.js');
var sqlcon = new sql_connection();
var express = require('express');

module.exports = function(req, res){
    if(req.user){
        var result = req.body.goal;
        var weg = [];
        run_query(result);
        function run_query(id){
        
            console.log(id)
            sqlcon.connection.query('SELECT h.id AS id, h.haengt_ab AS haengt_ab, a.name AS name FROM abschluss a, haengt_ab_a h WHERE h.id = a.id AND h.id = ' + id + ';', function(err, res, fields){
                if(res[0]){
                    console.log(res);
                    console.log(res.name);
                    for(i = 0; i < res.length; i++){
                        run_query(res[i].haengt_ab);
                    }
                }else{
                    console.log();
                    send_result()
                }
                
            })
        
        
        }
        function send_result(){
            res.send('finished query. show path.')
        }



    }
    else{

    }
}