var sql_connection = require('../custom_modules/sql_connect.js');
var sqlcon = new sql_connection();
var express = require('express');
var pug = require('pug');

module.exports = function(req, res){
    if(req.user){
        var result = req.body.goal;
        var weg = [];
        run_query(result);
        function run_query(id){
            console.log(id)
            sqlcon.connection.query('SELECT h.id AS id, h.haengt_ab AS haengt_ab, a.name AS name, a.min_alter AS min_alter, a.max_alter as max_alter,a.beschreibung as beschreibung, a.erreicht_durch as erreicht_durch FROM abschluss a, haengt_ab_a h WHERE h.id = a.id AND h.id = ' + id + ';', function(err, res, fields){
                if(err) console.log(err);
                if(res[0]){
                    for(i = 0; i < res.length; i++){
                        append_to_array(res[i]);
                        run_query(res[i].haengt_ab);
                    }
                }else{
                    send_result();
                }
            })
        
        
        }
        function append_to_array(res){
            weg.push(res);
            console.log(weg)
        }
        function send_result(){
            var main_auth = pug.compileFile('./templates/main_auth.pug', {pretty:true});
            var find_result = pug.compileFile('./templates/find_result.pug', {pretty:true});
            console.log('got here');
            res.send(main_auth({
                content: find_result({
                    results: weg
                })
            }))
        }



    }
    else{

    }
}