var sql_connection = require('../custom_modules/sql_connect.js');
var sqlcon = new sql_connection();
var pug = require('pug');
var path_obj = require('../models/path.js');

module.exports = function(req, res){
    if(req.user){
        var amountOfQueries =1;
        var result = req.body.goal;
        var weg = [];
        weg.push(new path_obj());
        run_query(result, 0);
        function run_query(id, pathindex){
            sqlcon.connection.query('SELECT * FROM abschluss WHERE id= '+ id + ';', function(err, res, fields){
                if(err) console.log(err);
                append_to_array(res[0], pathindex);
                sqlcon.connection.query('SELECT haengt_ab FROM haengt_ab_a WHERE id ='+res[0].id+';', function(err, res, fields){
                    if(err) console.log(err);
                    handle_subqueries(res, pathindex);
                })
                //launch dependency queries

        })
        function wait(num){
            amountOfQueries+=num;
            console.log("queries"+amountOfQueries);
            if(amountOfQueries==0){
                send_result()
            }
        }
        function handle_subqueries(res, pathindex){
            if(res[0]){
                wait(res.length);
                wait(-1);
                for(i = 0; i< res.length; i++){
                    if(i == 0){
                        run_query(res[i].haengt_ab, pathindex);
                    }else{
                        var newPath = new path_obj();
                        newPath.array = weg[pathindex].array.slice();
                        weg.push(newPath);
                        run_query(res[i].haengt_ab, weg.length-1);
                    }
                    
                }
                
            }else{
                console.log(res[0])
                wait(-1);
            }
        }
        }
        function append_to_array(res, pathindex){
            console.log(pathindex);
            if(weg[pathindex]){
                weg[pathindex].array.push(res);
            }else{
                throw new Error('can\'t push: path does not exist!');
            }
        }
        function send_result(){
            var main_auth = pug.compileFile('./templates/main_auth.pug', {pretty:true});
            var find_result = pug.compileFile('./templates/find_result.pug', {pretty:true});
            res.send(main_auth({
                content: find_result({
                    results: weg
                })
            }))
        }



    }
    else{
        res.redirect('/login');
    }
}