var pug = require('pug');
var mysql = require('mysql');
var sql_connect = require('../custom_modules/sql_connect');
var sqlcon = new sql_connect();
module.exports = function(req, res){
    var main = pug.compileFile('./templates/main.pug', {pretty:true});
    var main_auth = pug.compileFile('./templates/main_auth.pug',  {pretty:true});
    var profile = pug.compileFile('./templates/profile.pug', {pretty:true});
    if (req.user) {
        res.send(main_auth({
            content: profile({
                username: req.user.username,
                email: req.user.email,
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                birth_date: req.user.birth_date,
                account: req.user.account
            })
        }));
        
    } else {
        res.redirect('/login');
    }
    
}