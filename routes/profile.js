var pug = require('pug');
var mysql = require('mysql');
var sql_connect = require('../custom_modules/sql_connect');
var sqlcon = new sql_connect();
module.exports = function(req, res){
    var main = pug.compileFile('./templates/main.pug', {pretty:true});
    var main_auth = pug.compileFile('./templates/main_auth.pug',  {pretty:true});
    if (req.user) {
        res.send(main_auth({
            content: req.user.password
        }));
        
    } else {
        res.send(main({
            content:'sie sind nicht eingeloggt'
        }));
    }
    
}